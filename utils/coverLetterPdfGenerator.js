import jsPDF from 'jspdf'

export const generateCoverLetterPDF = async (coverLetterData, resumeData, template = 'classic') => {
  if (template === 'modern') {
    return generateModernCoverLetterPDF(coverLetterData, resumeData);
  } else {
    return generateClassicCoverLetterPDF(coverLetterData, resumeData);
  }
};

const generateClassicCoverLetterPDF = async (coverLetterData, resumeData) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
    compress: true,
  });

  pdf.setFont('times', 'normal');

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  const gap = 8;
  const leftColumnWidth = (contentWidth - gap) * 0.6;
  const rightColumnWidth = contentWidth - leftColumnWidth - gap;
  const leftColumnX = margin;
  const rightColumnX = margin + leftColumnWidth + gap;

  let yPosition = margin;

  const addWrappedText = (text, x, y, maxWidth, fontSize = 10, options = {}) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    const lineHeight = (fontSize / pdf.internal.scaleFactor) * (options.lineHeightFactor || 1.6);
    
    let cursorY = y;
    lines.forEach(line => {
      if (cursorY > pageHeight - margin) {
        pdf.addPage();
        cursorY = margin;
      }
      pdf.text(line, x, cursorY);
      cursorY += lineHeight;
    });
    return { height: cursorY - y, newY: cursorY };
  };

  const addSectionTitleWithLine = (title, x, y, width, color) => {
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(color[0], color[1], color[2]);
    pdf.text(title, x, y);
    pdf.setDrawColor(color[0], color[1], color[2]);
    pdf.setLineWidth(0.5);
    pdf.line(x, y + 2, x + width, y + 2);
    pdf.setTextColor(0, 0, 0); // Reset color
    pdf.setFont(undefined, 'normal');
    return y + 8;
  };

  // Main Content
  if (coverLetterData.coverLetterText) {
    const textResult = addWrappedText(coverLetterData.coverLetterText, leftColumnX, yPosition, leftColumnWidth, 10);
    yPosition = textResult.newY + 8;
  }

  if (coverLetterData.companyHighlights && coverLetterData.companyHighlights.length > 0) {
    yPosition = addSectionTitleWithLine('Experience Highlights', leftColumnX, yPosition, leftColumnWidth, [79, 70, 229]);

    coverLetterData.companyHighlights.forEach(company => {
        pdf.setFontSize(11);
        pdf.setFont(undefined, 'bold');
        pdf.text(company.companyName, leftColumnX, yPosition);
        yPosition += 5;
        
        pdf.setFontSize(9);
        pdf.setFont(undefined, 'normal');
        company.keyAchievements.forEach(achievement => {
            const result = addWrappedText(`• ${achievement}`, leftColumnX + 4, yPosition, leftColumnWidth - 4, 9);
            yPosition = result.newY + 2;
        });
        yPosition += 4;
    });
  }
  
  // Reset for sidebar
  let rightColumnY = margin;
  pdf.setPage(1);

  // Sidebar
  if (coverLetterData.alignmentScore !== undefined) {
    rightColumnY = addSectionTitleWithLine('Role Alignment', rightColumnX, rightColumnY, rightColumnWidth, [22, 163, 74]);
    
    const score = coverLetterData.alignmentScore;
    const scoreColor = getScoreColor(score);
    const centerX = rightColumnX + rightColumnWidth / 2;
    const centerY = rightColumnY + 14;
    const radius = 12;
    
    pdf.setLineWidth(2.5);
    pdf.setDrawColor(229, 231, 235); // gray-200
    pdf.circle(centerX, centerY, radius);
    pdf.stroke();

    const startAngle = -90;
    const angle = (score / 100) * 360;
    
    const steps = 100;
    let path = [];
    for (let i = 0; i <= steps; i++) {
        let currentAngle = startAngle + (angle * i / steps);
        let x = centerX + radius * Math.cos(currentAngle * Math.PI / 180);
        let y = centerY + radius * Math.sin(currentAngle * Math.PI / 180);
        path.push(i === 0 ? { op: 'm', c: [x, y] } : { op: 'l', c: [x, y] });
    }
    pdf.setDrawColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    pdf.path(path).stroke();
    
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    pdf.text(`${score}%`, centerX, centerY + 6, { align: 'center' });
    
    rightColumnY += (radius * 2) + 10;
    
    pdf.setFontSize(9);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(107, 114, 128);
    const descResult = addWrappedText(getAlignmentDescription(score), rightColumnX, rightColumnY, rightColumnWidth, 9, { align: 'center' });
    rightColumnY = descResult.newY + 8;
  }

  if (coverLetterData.alignedSkills && coverLetterData.alignedSkills.length > 0) {
    rightColumnY = addSectionTitleWithLine('Key Skills Match', rightColumnX, rightColumnY, rightColumnWidth, [59, 130, 246]);

    coverLetterData.alignedSkills.forEach(skill => {
        pdf.setFillColor(59, 130, 246);
        pdf.rect(rightColumnX, rightColumnY, 3, 3, 'F');
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'bold');
        pdf.text(skill.skillName, rightColumnX + 5, rightColumnY + 2.5);
        rightColumnY += 6;
        
        rightColumnY += 5;
    });
  }

  const filename = `${resumeData.personalInfo.fullName.replace(' ', '_')}_Cover_Letter_Classic.pdf`;
  
  return { pdf, filename };
};

const generateModernCoverLetterPDF = async (coverLetterData, resumeData) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'letter',
    compress: true,
  });

  pdf.setFont('helvetica', 'normal');

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  let yPosition = margin;

  // Header with gradient effect (simulated with colored background)
  pdf.setFillColor(59, 130, 246); // Blue
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  // Name and title
  pdf.setFontSize(24);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text(resumeData.personalInfo.fullName, margin, 25);
  
  pdf.setFontSize(14);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(219, 234, 254); // Light blue
  pdf.text(resumeData.personalInfo.title || 'Professional', margin, 32);

  // Contact info
  pdf.setFontSize(10);
  const contactInfo = [];
  if (resumeData.personalInfo.email) contactInfo.push(resumeData.personalInfo.email);
  if (resumeData.personalInfo.phone) contactInfo.push(resumeData.personalInfo.phone);
  if (resumeData.personalInfo.location) contactInfo.push(resumeData.personalInfo.location);
  
  const contactText = contactInfo.join(' • ');
  pdf.text(contactText, margin, 38);

  // Date
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  pdf.text(date, pageWidth - margin - pdf.getTextWidth(date), 25);

  yPosition = 50;

  const addWrappedText = (text, x, y, maxWidth, fontSize = 11, options = {}) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    const lineHeight = (fontSize / pdf.internal.scaleFactor) * (options.lineHeightFactor || 1.8);
    
    let cursorY = y;
    lines.forEach(line => {
      if (cursorY > pageHeight - margin) {
        pdf.addPage();
        cursorY = margin;
      }
      pdf.text(line, x, cursorY);
      cursorY += lineHeight;
    });
    return { height: cursorY - y, newY: cursorY };
  };

  const addSectionTitle = (title, x, y, color) => {
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(color[0], color[1], color[2]);
    pdf.text(title, x, y);
    pdf.setFont(undefined, 'normal');
    return y + 8;
  };

  // Main cover letter text
  if (coverLetterData.coverLetterText) {
    pdf.setTextColor(31, 41, 55); // Gray-900
    const textResult = addWrappedText(coverLetterData.coverLetterText, margin, yPosition, contentWidth, 11);
    yPosition = textResult.newY + 15;
  }

  // Experience Highlights
  if (coverLetterData.companyHighlights && coverLetterData.companyHighlights.length > 0) {
    yPosition = addSectionTitle('Experience Highlights', margin, yPosition, [34, 197, 94]); // Green
    
    coverLetterData.companyHighlights.forEach((company, index) => {
      // Company card background
      pdf.setFillColor(249, 250, 251); // Gray-50
      pdf.roundedRect(margin, yPosition, contentWidth, 30, 3, 3, 'F');
      
      // Company name
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(17, 24, 39); // Gray-900
      pdf.text(company.companyName, margin + 5, yPosition + 8);
      
      // Achievements
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      pdf.setTextColor(55, 65, 81); // Gray-700
      
      let achievementY = yPosition + 15;
      company.keyAchievements.forEach(achievement => {
        const result = addWrappedText(`• ${achievement}`, margin + 8, achievementY, contentWidth - 13, 10);
        achievementY = result.newY + 2;
      });
      
      yPosition = achievementY + 10;
    });
  }

  // Skills and alignment sidebar (on a new page for modern layout)
  pdf.addPage();
  yPosition = margin;

  // Role Alignment
  if (coverLetterData.alignmentScore !== undefined) {
    yPosition = addSectionTitle('Role Alignment', margin, yPosition, [59, 130, 246]); // Blue
    
    const score = coverLetterData.alignmentScore;
    const scoreColor = getScoreColor(score);
    const centerX = pageWidth / 2;
    const centerY = yPosition + 20;
    const radius = 25;
    
    // Background circle
    pdf.setLineWidth(3);
    pdf.setDrawColor(229, 231, 235); // Gray-200
    pdf.circle(centerX, centerY, radius);
    pdf.stroke();

    // Progress circle
    const startAngle = -90;
    const angle = (score / 100) * 360;
    
    const steps = 100;
    let path = [];
    for (let i = 0; i <= steps; i++) {
        let currentAngle = startAngle + (angle * i / steps);
        let x = centerX + radius * Math.cos(currentAngle * Math.PI / 180);
        let y = centerY + radius * Math.sin(currentAngle * Math.PI / 180);
        path.push(i === 0 ? { op: 'm', c: [x, y] } : { op: 'l', c: [x, y] });
    }
    pdf.setDrawColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    pdf.path(path).stroke();
    
    // Score text
    pdf.setFontSize(20);
    pdf.setFont(undefined, 'bold');
    pdf.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
    pdf.text(`${score}%`, centerX, centerY + 8, { align: 'center' });
    
    yPosition += 60;
    
    // Description
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(107, 114, 128); // Gray-500
    const descResult = addWrappedText(getAlignmentDescription(score), margin, yPosition, contentWidth, 12, { align: 'center' });
    yPosition = descResult.newY + 20;
  }

  // Key Skills Match
  if (coverLetterData.alignedSkills && coverLetterData.alignedSkills.length > 0) {
    yPosition = addSectionTitle('Key Skills Match', margin, yPosition, [99, 102, 241]); // Indigo
    
    coverLetterData.alignedSkills.forEach(skill => {
      // Skill card
      pdf.setFillColor(238, 242, 255); // Indigo-50
      pdf.roundedRect(margin, yPosition, contentWidth, 25, 3, 3, 'F');
      
      // Skill icon (simulated with colored square)
      pdf.setFillColor(99, 102, 241); // Indigo-500
      pdf.rect(margin + 5, yPosition + 5, 8, 8, 'F');
      
      // Skill name
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.setTextColor(17, 24, 39); // Gray-900
      pdf.text(skill.skillName, margin + 18, yPosition + 12);
      
             yPosition += 15;
    });
  }

  const filename = `${resumeData.personalInfo.fullName.replace(' ', '_')}_Cover_Letter_Modern.pdf`;
  
  return { pdf, filename };
};

const getAlignmentDescription = (score) => {
  if (score >= 85) return 'Excellent Match!'
  if (score >= 70) return 'Strong Alignment'
  if (score >= 55) return 'Good Fit'
  return 'Some Alignment'
}

const getScoreColor = (score) => {
    if (score >= 80) return [16, 185, 129]; // Green
    if (score >= 60) return [245, 158, 11]; // Yellow
    return [239, 68, 68]; // Red
};
