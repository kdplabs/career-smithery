export const useLocalStorage = () => {
    const getGeneratedResume = () => {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('generatedResume');
            return data ? JSON.parse(data) : null;
        }
        return null;
    };

    const saveGeneratedResume = (data) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('generatedResume', JSON.stringify(data));
        }
    };

    const getGeneratedCoverLetter = (jobId = null) => {
        if (typeof window !== 'undefined') {
            const key = jobId ? `generatedCoverLetter_${jobId}` : 'generatedCoverLetter';
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        }
        return null;
    };

    const saveGeneratedCoverLetter = (data, jobId = null) => {
        if (typeof window !== 'undefined') {
            const key = jobId ? `generatedCoverLetter_${jobId}` : 'generatedCoverLetter';
            localStorage.setItem(key, JSON.stringify(data));
        }
    };

    const clearGeneratedCoverLetter = (jobId = null) => {
        if (typeof window !== 'undefined') {
            const key = jobId ? `generatedCoverLetter_${jobId}` : 'generatedCoverLetter';
            localStorage.removeItem(key);
        }
    };

    return { getGeneratedResume, saveGeneratedResume, getGeneratedCoverLetter, saveGeneratedCoverLetter, clearGeneratedCoverLetter };
}
