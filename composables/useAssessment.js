export const useAssessment = () => {
  const currentStep = useState('currentStep', () => 1)
  const totalSteps = useState('totalSteps', () => 6)
  const router = useRouter()
  
  const assessmentData = useState('assessmentData', () => ({
    profile: {
      fullName: '',
      email: '',
      currentRole: '',
      yearsOfExperience: '',
      careerObjective: '',
      previousRoles: [],
      potentialPaths: []
    },
    careerStage: {
      ageRange: '',
      careerFocus: '',
      primaryGoal: '',
      experienceLevel: '',
      developmentApproach: ''
    },
    learningDevelopment: {
      learningOpportunities: '',
      skillAcquisition: '',
      skillApplication: '',
      learningImpact: '',
      futureDevelopment: ''
    },
    leadershipPotential: {
      currentRole: '',
      leadershipExperience: '',
      leadershipSkills: '',
      leadershipAspirations: '',
      readinessLevel: ''
    },
    nineBoxGrid: {
      performance: '',
      delivery: '',
      quality: '',
      growthPotential: '',
      learningAbility: '',
      satisfaction: '',
      motivation: ''
    },
    skills: {
      primaryExpertise: '',
      customPrimarySkill: '',
      expertiseLevel: '',
      secondaryAreas: [],
      hasOtherSecondary: false,
      customSecondarySkills: [],
      skillBreadth: '',
      futureSkills: [],
      hasOtherFuture: false,
      customFutureSkills: []
    }
  }))

  const saveStepData = () => {
    localStorage.setItem('assessmentData', JSON.stringify(assessmentData.value))
  }

  const nextStep = () => {
    if (currentStep.value < totalSteps.value) {
      saveStepData()
      currentStep.value++
    }
  }

  const previousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  const processAssessmentData = () => {
    const data = assessmentData.value
    console.log('Assessment data');
    console.log(data);
    // Process Career Stage
    let careerStage = 'Exploration'
    if (data.careerStage.ageRange === '25-45') careerStage = 'Establishment'
    else if (data.careerStage.ageRange === '45-55') careerStage = 'Mid-Career'
    else if (data.careerStage.ageRange === '55+') careerStage = 'Late Career'

    // Process Kirkpatrick Level
    let kirkpatrickLevel = 'Level 1: Reaction'
    if (data.learningDevelopment.learningImpact === 'significant') kirkpatrickLevel = 'Level 4: Results'
    else if (data.learningDevelopment.skillApplication === 'excellent') kirkpatrickLevel = 'Level 3: Behavior'
    else if (data.learningDevelopment.skillAcquisition === 'excellent') kirkpatrickLevel = 'Level 2: Learning'

    // Process Leadership Potential
    let leadershipPotential = 'Managing Self'
    if (data.leadershipPotential.currentRole === 'enterprise') leadershipPotential = 'Enterprise Leader'
    else if (data.leadershipPotential.currentRole === 'business') leadershipPotential = 'Business Leader'
    else if (data.leadershipPotential.currentRole === 'functional') leadershipPotential = 'Functional Leader'
    else if (data.leadershipPotential.currentRole === 'manager_of_managers') leadershipPotential = 'Managing Managers'
    else if (data.leadershipPotential.currentRole === 'manager') leadershipPotential = 'Managing Others'

    // Process 3x3x3 Position
    const calculateEngagement = (satisfaction, motivation) => {
      // Convert string values to numbers for calculation
      const satisfactionMap = { 'Low': 1, 'Moderate': 2, 'High': 3 }
      const motivationMap = { 'Low': 1, 'Moderate': 2, 'High': 3 }
      
      const satisfactionScore = satisfactionMap[satisfaction] || 1
      const motivationScore = motivationMap[motivation] || 1
      
      // Calculate average score
      const averageScore = (satisfactionScore + motivationScore) / 2
      
      // Convert back to string value
      if (averageScore >= 2.5) return 'High'
      if (averageScore >= 1.5) return 'Moderate'
      return 'Low'
    }

    const calculatePerformance = (performance, delivery, quality) => {
      // Convert string values to numbers for calculation
      const scoreMap = { 'Low': 1, 'Moderate': 2, 'High': 3 }
      
      const performanceScore = scoreMap[performance] || 1
      const deliveryScore = scoreMap[delivery] || 1
      const qualityScore = scoreMap[quality] || 1
      
      // Calculate weighted average (giving more weight to quality and delivery)
      const averageScore = (performanceScore + (deliveryScore * 1.2) + (qualityScore * 1.2)) / 3.4
      
      // Convert back to string value
      if (averageScore >= 2.5) return 'High'
      if (averageScore >= 1.5) return 'Moderate'
      return 'Low'
    }

    const calculatePotential = (growthPotential, learningAbility) => {
      // Convert string values to numbers for calculation
      const scoreMap = { 'Low': 1, 'Moderate': 2, 'High': 3 }
      
      const growthScore = scoreMap[growthPotential] || 1
      const learningScore = scoreMap[learningAbility] || 1
      
      // Calculate average score
      const averageScore = (growthScore + learningScore) / 2
      
      // Convert back to string value
      if (averageScore >= 2.5) return 'High'
      if (averageScore >= 1.5) return 'Moderate'
      return 'Low'
    }

    const threeByThreePosition = {
      performance: calculatePerformance(
        data.nineBoxGrid.performance || 'Low',
        data.nineBoxGrid.delivery || 'Low',
        data.nineBoxGrid.quality || 'Low'
      ),
      potential: calculatePotential(
        data.nineBoxGrid.growthPotential || 'Low',
        data.nineBoxGrid.learningAbility || 'Low'
      ),
      engagement: calculateEngagement(
        data.nineBoxGrid.satisfaction || 'Low',
        data.nineBoxGrid.motivation || 'Low'
      )
    }

    // Process Skills Profile
    let skillsProfile = {
      type: 'I-Shaped',
      primarySkill: data.skills.primaryExpertise === 'other' ? data.skills.customPrimarySkill : data.skills.primaryExpertise,
      primaryLevel: data.skills.expertiseLevel,
      secondarySkills: [...(data.skills.secondaryAreas || []), ...(data.skills.customSecondarySkills || [])],
      breadth: data.skills.skillBreadth,
      developmentAreas: [...(data.skills.futureSkills || []), ...(data.skills.customFutureSkills || [])]
    }

    // Determine T/Pi shaped based on secondary skills
    if ((data.skills.secondaryAreas || []).length > 2) {
      skillsProfile.type = 'Pi-Shaped'
    } else if ((data.skills.secondaryAreas || []).length > 0) {
      skillsProfile.type = 'T-Shaped'
    }

    // Return the processed data with all necessary fields
    const processedData = {
      profile: {
        ...data.profile,
        previousRoles: data.profile.previousRoles || [],
        potentialPaths: data.profile.potentialPaths || []
      },
      careerStage,
      kirkpatrickLevel,
      leadershipPotential,
      nineBoxGrid: {
        performance: data.nineBoxGrid.performance || 'Low',
        delivery: data.nineBoxGrid.delivery || 'Low',
        quality: data.nineBoxGrid.quality || 'Low',
        growthPotential: data.nineBoxGrid.growthPotential || 'Low',
        learningAbility: data.nineBoxGrid.learningAbility || 'Low',
        satisfaction: data.nineBoxGrid.satisfaction || 'Low',
        motivation: data.nineBoxGrid.motivation || 'Low'
      },
      threeByThreePosition,
      skillsProfile,
      skills: {
        ...data.skills,
        secondaryAreas: data.skills.secondaryAreas || [],
        customSecondarySkills: data.skills.customSecondarySkills || [],
        futureSkills: data.skills.futureSkills || [],
        customFutureSkills: data.skills.customFutureSkills || []
      },
      learningDevelopment: data.learningDevelopment
    }

    console.log('Processed Data:', processedData)
    return processedData
  }

  const submitAssessment = () => {
    saveStepData()
    const processedData = processAssessmentData()
    console.log('processedData');
    console.log(processedData); 
    // Store the processed data in localStorage for the summary page
    localStorage.setItem('assessmentSummary', JSON.stringify(processedData))
    
    // Navigate to summary page
    router.push('/summary')
  }

  // Load saved data on component mount
  onMounted(() => {
    const savedData = localStorage.getItem('assessmentData')
    if (savedData) {
      assessmentData.value = JSON.parse(savedData)
    }
  })

  return {
    currentStep,
    totalSteps,
    assessmentData,
    nextStep,
    previousStep,
    submitAssessment
  }
} 