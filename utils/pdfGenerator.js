import jsPDF from 'jspdf'

// --- Helper Functions ---
const addWrappedText = (pdf, text, options) => {
  const { x, y, maxWidth, font = 'helvetica', size = 10, style = 'normal', color = [0, 0, 0], lineHeight = 5 } = options
  pdf.setFont(font, style)
  pdf.setFontSize(size)
  if (color) {
    pdf.setTextColor(color[0], color[1], color[2])
  }
  
  const lines = pdf.splitTextToSize(text, maxWidth)
  pdf.text(lines, x, y)
  return lines.length * lineHeight
}

const checkNewPage = (pdf, yPosition, requiredSpace, topMargin) => {
  const pageHeight = pdf.internal.pageSize.getHeight()
  if (yPosition + requiredSpace >= pageHeight - 25) { // Increased bottom margin to 25mm
    pdf.addPage()
    return topMargin
  }
  return yPosition
}


// --- Template: Classic ---
const generateClassicPDF = (pdf, resumeData) => {
  const pageWidth = pdf.internal.pageSize.getWidth()
  const leftMargin = 15
  const contentWidth = pageWidth - (leftMargin * 2)
  let y = 20

  // Header
  const info = resumeData.personalInfo
  pdf.setFontSize(26).setFont('times', 'bold').setTextColor(0,0,0)
  pdf.text(info.fullName || '', pageWidth / 2, y, { align: 'center' })
  y += 10
  const contactInfo = [info.email, info.phone, info.location, info.linkedin].filter(Boolean).join('  •  ')
  pdf.setFontSize(11).setFont('times', 'normal').setTextColor(50, 50, 50)
  pdf.text(contactInfo, pageWidth / 2, y, { align: 'center' })
  y += 10
  pdf.setDrawColor(50, 50, 50).setLineWidth(0.5).line(leftMargin, y, pageWidth - leftMargin, y)
  y += 10
  
  const addSection = (title, content) => {
    y = checkNewPage(pdf, y, 15, 20)
    pdf.setFontSize(14).setFont('times', 'bold').setTextColor(0, 0, 0)
    pdf.text(title.toUpperCase(), leftMargin, y)
    y += 1
    pdf.setDrawColor(80, 80, 80).setLineWidth(0.2).line(leftMargin, y, pageWidth - leftMargin, y)
    y += 8
    content()
    y += 10
  }

  // Summary
  if (resumeData.professionalSummary) {
    addSection('Professional Summary', () => {
      const height = addWrappedText(pdf, resumeData.professionalSummary, {
        x: leftMargin, y, maxWidth: contentWidth, font: 'times', size: 11, color: [50, 50, 50], lineHeight: 6
      })
      y += height
    })
  }

  // Experience
  if (resumeData.workExperience?.length) {
    addSection('Work Experience', () => {
      resumeData.workExperience.forEach(job => {
        y = checkNewPage(pdf, y, 25, 20)
        pdf.setFontSize(12).setFont('times', 'bold')
        pdf.text(job.jobTitle || '', leftMargin, y)
        const dateText = `${job.startDate || ''} - ${job.endDate || 'Present'}`
        pdf.text(dateText, pageWidth - leftMargin, y, { align: 'right' })
        y += 6
        pdf.setFontSize(11).setFont('times', 'italic').setTextColor(80, 80, 80)
        const companyInfo = `${job.company || ''}${job.location ? ', ' + job.location : ''}`
        pdf.text(companyInfo, leftMargin, y)
        y += 7
        if (job.achievements?.length) {
          job.achievements.forEach(ach => {
            const lines = pdf.splitTextToSize(`• ${ach}`, contentWidth - 5)
            const textHeight = lines.length * 6
            y = checkNewPage(pdf, y, textHeight, 20)
            const height = addWrappedText(pdf, `• ${ach}`, {
              x: leftMargin + 5, y, maxWidth: contentWidth - 5, font: 'times', size: 11, color: [50, 50, 50], lineHeight: 6
            })
            y += height + 1
          })
        }
        y += 6
      })
    })
  }

  // Education
  if (resumeData.education?.length) {
    addSection('Education', () => {
      resumeData.education.forEach(edu => {
          y = checkNewPage(pdf, y, 15, 20)
          pdf.setFontSize(12).setFont('times', 'bold')
          const degreeInfo = `${edu.degree || ''}${edu.field ? `, ${edu.field}` : ''}`
          pdf.text(degreeInfo, leftMargin, y)
          pdf.setFontSize(11).setFont('times', 'normal')
          pdf.text(edu.graduationYear || '', pageWidth - leftMargin, y, { align: 'right' })
          y += 6
          pdf.text(edu.institution || '', leftMargin, y)
          y += 8
      })
    })
  }

  // Skills
  if (resumeData.skills) {
    addSection('Skills', () => {
      const skillEntry = (title, skills) => {
        if (!skills || !skills.length) return
        y = checkNewPage(pdf, y, 10, 20)
        pdf.setFontSize(11).setFont('times', 'bold').text(title, leftMargin, y)
        const height = addWrappedText(pdf, skills.join(', '), {
          x: leftMargin + 25, y, maxWidth: contentWidth - 25, font: 'times', size: 11, style: 'normal', color: [50, 50, 50], lineHeight: 6
        })
        y += height + 2
      }
      skillEntry('Technical:', resumeData.skills.technical)
      skillEntry('Tools:', resumeData.skills.tools)
      skillEntry('Soft Skills:', resumeData.skills.soft)
    })
  }
}

// --- Template: Modern ---
const generateModernPDF = (pdf, resumeData) => {
  const pageWidth = pdf.internal.pageSize.getWidth()
  let y = 0
  
  // Header
  pdf.setFillColor(37, 99, 235).rect(0, y, pageWidth, 55, 'F')
  y += 20
  const info = resumeData.personalInfo
  pdf.setFontSize(30).setFont('helvetica', 'bold').setTextColor(255, 255, 255)
  pdf.text(info.fullName || '', 20, y)
  y += 12
  const contactInfo = [info.email, info.phone, info.location].filter(Boolean).join('  |  ')
  pdf.setFontSize(10).setFont('helvetica', 'normal')
  pdf.text(contactInfo, 20, y)
  y = 65

  const addSection = (title, content) => {
    y = checkNewPage(pdf, y, 20, 20)
    pdf.setFontSize(16).setFont('helvetica', 'bold').setTextColor(40, 40, 40)
    pdf.setFillColor(37, 99, 235).rect(15, y - 5, 2, 8, 'F')
    pdf.text(title.toUpperCase(), 20, y)
    y += 10
    content()
    y += 6 // Reduced space after section
  }

  // Summary
  if (resumeData.professionalSummary) {
    addSection('Professional Summary', () => {
      // pdf.setFillColor(243, 244, 246).rect(20, y, pageWidth - 40, 20, 'F')
      // pdf.setDrawColor(220, 220, 220).line(20, y, 20, y + 20)
      const height = addWrappedText(pdf, resumeData.professionalSummary, {
        x: 25, y: y + 5, maxWidth: pageWidth - 50, font: 'helvetica', size: 10, style: 'normal', color: [50, 50, 50], lineHeight: 5
      })
      y += height + 10
    })
  }

  // Experience
  if (resumeData.workExperience?.length) {
    addSection('Work Experience', () => {
      resumeData.workExperience.forEach(job => {
        y = checkNewPage(pdf, y, 30, 20)
        pdf.setDrawColor(220, 220, 220).line(22, y + 4, 22, y + 40) // Timeline
        pdf.setFillColor(37, 99, 235).circle(22, y, 2, 'F')
        
        pdf.setFontSize(12).setFont('helvetica', 'bold').text(job.jobTitle || '', 30, y)
        y += 6
        pdf.setFontSize(10).setFont('helvetica', 'normal').setTextColor(80, 80, 80)
        pdf.text(`${job.company || ''} | ${job.startDate || ''} - ${job.endDate || 'Present'}`, 30, y)
        y += 8
        if (job.achievements?.length) {
          job.achievements.forEach(ach => {
            const lines = pdf.splitTextToSize(`• ${ach}`, pageWidth - 60)
            const textHeight = lines.length * 5
            y = checkNewPage(pdf, y, textHeight, 20)
            const height = addWrappedText(pdf, `• ${ach}`, {
              x: 35, y, maxWidth: pageWidth - 60, size: 10, color: [50, 50, 50], lineHeight: 5
            })
            y += height + 1
          })
        }
        y += 8
      })
    })
  }
  
  // --- Education ---
  if (resumeData.education?.length) {
    addSection('Education', () => {
      resumeData.education.forEach(edu => {
        y = checkNewPage(pdf, y, 15, 20);
        const eduText = `${edu.degree || ''}, ${edu.institution || ''} (${edu.graduationYear || ''})`;
        const height = addWrappedText(pdf, eduText, {
            x: 20, y, maxWidth: pageWidth - 40, size: 10, style: 'normal', color: [80, 80, 80], lineHeight: 5
        });
        y += height + 4;
      });
    });
  }

  // --- Skills ---
  if (resumeData.skills) {
    addSection('Skills', () => {
      const skillEntry = (title, skills) => {
        if (!skills || !skills.length) return;
        y = checkNewPage(pdf, y, 15, 20);
        pdf.setFontSize(10).setFont('helvetica', 'bold').setTextColor(80, 80, 80);
        pdf.text(title, 20, y);
        y += 5;
        const height = addWrappedText(pdf, skills.join(', '), {
            x: 20, y, maxWidth: pageWidth - 40, size: 10, style: 'normal', color: [80, 80, 80], lineHeight: 5
        });
        y += height + 4;
      };
      
      skillEntry('Technical:', resumeData.skills.technical);
      skillEntry('Tools:', resumeData.skills.tools);
      skillEntry('Soft Skills:', resumeData.skills.soft);
    });
  }

  // --- Certifications ---
  if (resumeData.certifications?.length) {
      addSection('Certifications', () => {
          resumeData.certifications.forEach(cert => {
              y = checkNewPage(pdf, y, 15, 20);
              pdf.setFontSize(11).setFont('helvetica', 'bold').text(cert.name || '', 20, y);
              pdf.setFontSize(10).setFont('helvetica', 'normal').setTextColor(80, 80, 80);
              pdf.text(cert.issuer || '', 20, y + 5);
              pdf.text(cert.date || '', pageWidth - 20, y, { align: 'right' });
              y += 12;
          });
      });
  }

  // --- Projects ---
  if (resumeData.projects?.length) {
      addSection('Projects', () => {
          resumeData.projects.forEach(project => {
              y = checkNewPage(pdf, y, 20, 20);
              pdf.setFontSize(12).setFont('helvetica', 'bold').text(project.name || '', 20, y);
              y += 6;
              const descHeight = addWrappedText(pdf, project.description || '', {
                  x: 20, y, maxWidth: contentWidth, size: 10, style: 'normal', color: [80, 80, 80], lineHeight: 5
              });
              y += descHeight + 2;
              if (project.technologies?.length) {
                  const techText = `Technologies: ${project.technologies.join(', ')}`;
                  const techHeight = addWrappedText(pdf, techText, {
                      x: 20, y, maxWidth: contentWidth, size: 9, style: 'italic', color: [100, 100, 100], lineHeight: 4
                  });
                  y += techHeight + 2;
              }
              y += 8;
          });
      });
  }
}

// --- Template: Minimal ---
const generateMinimalPDF = (pdf, resumeData) => {
  const pageWidth = pdf.internal.pageSize.getWidth()
  const leftMargin = 20
  const contentWidth = pageWidth - (leftMargin * 2)
  let y = 30

  // Header
  const info = resumeData.personalInfo
  pdf.setFontSize(36).setFont('helvetica', 'light').setTextColor(0, 0, 0)
  pdf.text(info.fullName || '', leftMargin, y)
  y += 15
  const contactInfo = [info.email, info.phone, info.location, info.linkedin].filter(Boolean).join('   ')
  pdf.setFontSize(10).setFont('helvetica', 'normal').setTextColor(100, 100, 100)
  pdf.text(contactInfo, leftMargin, y)
  y += 10
  pdf.setDrawColor(220, 220, 220).line(leftMargin, y, pageWidth - leftMargin, y)
  y += 8

  const addSection = (title, content) => {
    y = checkNewPage(pdf, y, 20, 30)
    pdf.setFontSize(11).setFont('helvetica', 'bold').setTextColor(0, 0, 0).setCharSpace(1)
    pdf.text(title.toUpperCase(), leftMargin, y)
    pdf.setCharSpace(0)
    y += 12
    content()
    y += 5
  }

  // Summary
  if (resumeData.professionalSummary) {
    const height = addWrappedText(pdf, resumeData.professionalSummary, {
      x: leftMargin, y, maxWidth: contentWidth, font: 'helvetica', size: 10, style: 'normal', color: [80, 80, 80], lineHeight: 6
    })
    y += height
    y += 5
  }

  // Experience
  if (resumeData.workExperience?.length) {
    addSection('Experience', () => {
      resumeData.workExperience.forEach(job => {
        y = checkNewPage(pdf, y, 25, 30)
        pdf.setFontSize(12).setFont('helvetica', 'bold')
        pdf.text(job.jobTitle || '', leftMargin, y)
        const dateText = `${job.startDate || ''} — ${job.endDate || 'Present'}`
        pdf.setFontSize(10).setFont('helvetica', 'normal').setTextColor(100, 100, 100)
        pdf.text(dateText, pageWidth - leftMargin, y, { align: 'right' })
        y += 6
        pdf.setFontSize(10).setFont('helvetica', 'normal').setTextColor(100, 100, 100)
        pdf.text(`${job.company || ''}${job.location ? ', ' + job.location : ''}`, leftMargin, y)
        y += 8
        if (job.achievements?.length) {
          job.achievements.forEach(ach => {
            const lines = pdf.splitTextToSize(`— ${ach}`, contentWidth)
            const textHeight = lines.length * 6
            y = checkNewPage(pdf, y, textHeight, 30)
            const height = addWrappedText(pdf, `— ${ach}`, {
              x: leftMargin, y, maxWidth: contentWidth, font: 'helvetica', size: 10, style: 'normal', color: [80, 80, 80], lineHeight: 6
            })
            y += height + 2
          })
        }
        y += 8
      })
    })
  }

  // Education
  if (resumeData.education?.length) {
    addSection('Education', () => {
      resumeData.education.forEach(edu => {
        y = checkNewPage(pdf, y, 15, 30)
        pdf.setFontSize(10).setFont('helvetica', 'bold').text(edu.degree, leftMargin, y)
        y += 5
        pdf.setFont('helvetica', 'normal').text(edu.institution, leftMargin, y)
        y += 5
      })
    })
  }

  // Skills
  if (resumeData.skills) {
    addSection('Skills', () => {
      if (resumeData.skills.technical?.length) {
        const height = addWrappedText(pdf, resumeData.skills.technical.join(', '), {
          x: leftMargin, y, maxWidth: contentWidth, size: 10, color: [80, 80, 80], lineHeight: 6,
        })
        y += height + 2
      }
    })
  }
}

// --- Main Export ---
export const generatePdfForTemplate = async (resumeData, templateId = 'classic') => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter'
    })

    switch (templateId) {
      case 'modern':
        generateModernPDF(pdf, resumeData)
        break
      case 'minimal':
        generateMinimalPDF(pdf, resumeData)
        break
      default:
        generateClassicPDF(pdf, resumeData)
        break
    }

    const name = resumeData.personalInfo?.fullName || 'Resume'
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `${name.replace(/\s+/g, '_')}_Resume_${templateId}_${timestamp}.pdf`
    pdf.save(filename)

  } catch (error) {
    console.error(`Failed to generate PDF for template ${templateId}:`, error)
    throw new Error('Failed to generate PDF: ' + error.message)
  }
}
