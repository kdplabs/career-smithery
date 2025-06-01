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
    
    // First determine base stage from age
    if (data.careerStage.ageRange === '25-45') {
      careerStage = 'Establishment'
    } else if (data.careerStage.ageRange === '45-55') {
      careerStage = 'Mid-Career'
    } else if (data.careerStage.ageRange === '55+') {
      careerStage = 'Late Career'
    }

    // Then refine the stage based on other factors, but only within age-appropriate bounds
    if (careerStage === 'Establishment') {
      // For 25-45 age range, can only be Establishment or early Mid-Career
      if (data.careerStage.experienceLevel === 'expert' && 
          (data.careerStage.careerFocus === 'mentoring' || data.careerStage.primaryGoal === 'legacy')) {
        careerStage = 'Mid-Career' // Early transition to Mid-Career
      }
    } else if (careerStage === 'Mid-Career') {
      // For 45-55 age range, can be Mid-Career or early Late Career
      if (data.careerStage.experienceLevel === 'expert' && 
          data.careerStage.careerFocus === 'mentoring' && 
          data.careerStage.primaryGoal === 'legacy') {
        careerStage = 'Late Career' // Early transition to Late Career
      }
    } else if (careerStage === 'Late Career') {
      // For 55+ age range, can only be Late Career
      // No refinement needed as this is the final stage
    } else {
      // For other ages, can be Exploration or early Establishment
      if (data.careerStage.experienceLevel === 'intermediate' && 
          data.careerStage.careerFocus === 'specialization') {
        careerStage = 'Establishment' // Early transition to Establishment
      }
    }

    // Process Kirkpatrick Level
    const calculateKirkpatrickScore = (data) => {
      let score = 0
      
      // Learning Opportunities (Level 1: Reaction) - 20% weight
      const reactionScores = {
        'very_positive': 4,
        'positive': 3,
        'neutral': 2,
        'negative': 1
      }
      score += (reactionScores[data.learningDevelopment.learningOpportunities] || 1) * 0.2
      
      // Skill Acquisition (Level 2: Learning) - 20% weight
      const learningScores = {
        'excellent': 4,
        'good': 3,
        'moderate': 2,
        'minimal': 1
      }
      score += (learningScores[data.learningDevelopment.skillAcquisition] || 1) * 0.2
      
      // Skill Application (Level 3: Behavior) - 30% weight
      const behaviorScores = {
        'excellent': 4,
        'good': 3,
        'moderate': 2,
        'minimal': 1
      }
      score += (behaviorScores[data.learningDevelopment.skillApplication] || 1) * 0.3
      
      // Learning Impact (Level 4: Results) - 20% weight
      const impactScores = {
        'significant': 4,
        'moderate': 3,
        'minimal': 2,
        'none': 1
      }
      score += (impactScores[data.learningDevelopment.learningImpact] || 1) * 0.2
      
      // Future Development Approach - 10% weight
      const futureScores = {
        'proactive': 4,
        'planned': 3,
        'reactive': 2,
        'passive': 1
      }
      score += (futureScores[data.learningDevelopment.futureDevelopment] || 1) * 0.1
      
      return score
    }
    
    // Calculate the Kirkpatrick score
    const kirkpatrickScore = calculateKirkpatrickScore(data)
    
    // Determine Kirkpatrick level based on score
    let kirkpatrickLevel = 'Level 1: Reaction'
    if (kirkpatrickScore >= 3.5) {
      kirkpatrickLevel = 'Level 4: Results'
    } else if (kirkpatrickScore >= 3.0) {
      kirkpatrickLevel = 'Level 3: Behavior'
    } else if (kirkpatrickScore >= 2.5) {
      kirkpatrickLevel = 'Level 2: Learning'
    } else {
      kirkpatrickLevel = 'Level 1: Reaction'
    }

    // Process Leadership Potential
    let leadershipPotential = 'Managing Self'
    
    // Create a scoring system for leadership potential
    const calculateLeadershipScore = (data) => {
      let score = 0
      
      // Current Role (40% weight)
      const roleScores = {
        'enterprise': 6,
        'business': 5,
        'functional': 4,
        'manager_of_managers': 3,
        'manager': 2,
        'individual': 1
      }
      score += (roleScores[data.leadershipPotential.currentRole] || 1) * 0.4
      
      // Leadership Experience (20% weight)
      const experienceScores = {
        'large_teams': 6,
        'multiple_teams': 5,
        'small_teams': 4,
        'project_teams': 3,
        'no_teams': 1
      }
      score += (experienceScores[data.leadershipPotential.leadershipExperience] || 1) * 0.2
      
      // Leadership Skills (20% weight)
      const skillScores = {
        'excellent': 6,
        'advanced': 5,
        'competent': 4,
        'developing': 3,
        'basic': 2,
        'none': 1
      }
      score += (skillScores[data.leadershipPotential.leadershipSkills] || 1) * 0.2
      
      // Leadership Aspirations (10% weight)
      const aspirationScores = {
        'enterprise': 6,
        'business': 5,
        'functional': 4,
        'department': 3,
        'team': 2,
        'none': 1
      }
      score += (aspirationScores[data.leadershipPotential.leadershipAspirations] || 1) * 0.1
      
      // Readiness Level (10% weight)
      const readinessScores = {
        'very_ready': 6,
        'ready': 5,
        'somewhat_ready': 4,
        'developing': 3,
        'not_ready': 1
      }
      score += (readinessScores[data.leadershipPotential.readinessLevel] || 1) * 0.1
      
      return score
    }
    
    // Calculate the leadership score
    const leadershipScore = calculateLeadershipScore(data)
    
    // Determine leadership potential based on score
    if (leadershipScore >= 5.0) {
      leadershipPotential = 'Enterprise Leader'
    } else if (leadershipScore >= 4.0) {
      leadershipPotential = 'Business Leader'
    } else if (leadershipScore >= 3.0) {
      leadershipPotential = 'Functional Leader'
    } else if (leadershipScore >= 2.5) {
      leadershipPotential = 'Managing Managers'
    } else if (leadershipScore >= 2.0) {
      leadershipPotential = 'Managing Others'
    } else {
      leadershipPotential = 'Managing Self'
    }

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
    if ((data.skills.secondaryAreas || []).length >= 2) {
      skillsProfile.type = 'Pi-Shaped'
    } else if ((data.skills.secondaryAreas || []).length === 1) {
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