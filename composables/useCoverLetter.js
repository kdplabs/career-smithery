import { ref } from 'vue';
import { useLocalStorage } from '~/composables/useLocalStorage';
import { generateCoverLetterPDF } from '~/utils/coverLetterPdfGenerator';

export const useCoverLetter = (jobId = null) => {
  const { getGeneratedResume, getGeneratedCoverLetter, saveGeneratedCoverLetter, clearGeneratedCoverLetter } = useLocalStorage();

  const jobDescription = ref('');
  const coverLetterData = ref(null);
  const generatingCoverLetter = ref(false);
  const downloadingPDF = ref(false);

  // Check for saved data on initialization
  const savedCoverLetter = getGeneratedCoverLetter(jobId);
  if (savedCoverLetter) {
    coverLetterData.value = savedCoverLetter;
  }

  const generate = async () => {
    generatingCoverLetter.value = true;
    try {
      const resumeData = getGeneratedResume();
      if (!resumeData) {
        alert('Please generate a resume first.');
        // Consider redirecting to the resume wizard
        return;
      }

      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeData,
          jobDescription: jobDescription.value,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate cover letter');
      }

      const result = await response.json();
      coverLetterData.value = result;
      saveGeneratedCoverLetter(result, jobId);

    } catch (error) {
      console.error(error);
      alert('An error occurred while generating the cover letter.');
    } finally {
      generatingCoverLetter.value = false;
    }
  };

  const download = async () => {
    if (!coverLetterData.value) return;
    
    downloadingPDF.value = true;
    try {
      const resumeData = getGeneratedResume();
      const { pdf, filename } = generateCoverLetterPDF(coverLetterData.value, resumeData);
      pdf.save(filename);
    } catch (error) {
      console.error('Error downloading cover letter:', error);
      alert('Failed to download cover letter.');
    } finally {
      downloadingPDF.value = false;
    }
  };

  const reset = () => {
    coverLetterData.value = null;
    clearGeneratedCoverLetter(jobId);
  };

  return {
    jobDescription,
    coverLetterData,
    generatingCoverLetter,
    downloadingPDF,
    generateCoverLetter: generate,
    downloadCoverLetter: download,
    resetCoverLetter: reset
  };
};
