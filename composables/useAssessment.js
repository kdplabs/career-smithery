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

    // Process Nine Box Position
    const performance = data.nineBoxGrid.performance
    const potential = data.nineBoxGrid.growthPotential

    // Process 3x3x3 Position
    const threeByThreePosition = {
      performance: data.nineBoxGrid.performance,
      potential: data.nineBoxGrid.growthPotential,
      engagement: data.nineBoxGrid.satisfaction === 'High' ? 'High' : 
                 data.nineBoxGrid.satisfaction === 'Moderate' ? 'Medium' : 'Low'
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

    return {
      profile: data.profile,
      careerStage,
      kirkpatrickLevel,
      leadershipPotential,
      nineBoxPosition: { performance, potential },
      threeByThreePosition,
      skillsProfile,
      previousRoles: data.profile.previousRoles,
      potentialCareerPaths: data.profile.potentialPaths
    }
  }

  const submitAssessment = () => {
    saveStepData()
    const processedData = processAssessmentData()
    
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