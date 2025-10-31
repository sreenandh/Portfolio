// Dynamic Experience Calculator
// Automatically calculates total work experience based on actual job dates

export const experienceData = [
  {
    title: 'Software Developer',
    company: 'Cybmirror Innovations LLP',
    startDate: '2025-09-01',
    endDate: null, // null means current position
  },
  {
    title: 'Software Engineer Intern', 
    company: 'Nubolerta Technology Solutions',
    startDate: '2025-05-01',
    endDate: '2025-06-30',
  },
  {
    title: 'MERN Stack Developer Intern',
    company: 'Luminar Technolab', 
    startDate: '2024-07-01',
    endDate: '2025-01-31',
  }
];

/**
 * Calculates total professional experience from all positions
 * Updates automatically every month
 */
export const calculateTotalExperience = () => {
  let totalDays = 0;
  const currentDate = new Date();
  
  experienceData.forEach(job => {
    const startDate = new Date(job.startDate);
    const endDate = job.endDate ? new Date(job.endDate) : currentDate;
    
    // Calculate days worked for this position
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    totalDays += daysDiff;
  });
  
  // Convert days to months (more accurate calculation)
  const totalMonths = Math.floor(totalDays / 30.44); // Average days per month
  
  return formatExperience(totalMonths);
};

/**
 * Formats experience in human-readable format
 * Examples: "11 Months", "1+ Years", "2+ Years"
 */
const formatExperience = (months) => {
  if (months < 1) {
    return "New Graduate";
  } else if (months < 12) {
    return `${months} Month${months === 1 ? '' : 's'}`;
  } else {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) {
      return `${years} Year${years === 1 ? '' : 's'}`;
    } else {
      return `${years}+ Year${years === 1 ? '' : 's'}`;
    }
  }
};

/**
 * Get current experience as a simple string
 * This is what you'll use in your About component
 */
export const getCurrentExperience = () => {
  return calculateTotalExperience();
};

/**
 * Get detailed breakdown of experience (optional - for debugging)
 */
export const getExperienceBreakdown = () => {
  const currentDate = new Date();
  
  return experienceData.map(job => {
    const startDate = new Date(job.startDate);
    const endDate = job.endDate ? new Date(job.endDate) : currentDate;
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const monthsDiff = Math.floor(daysDiff / 30.44);
    
    return {
      ...job,
      duration: formatExperience(monthsDiff),
      isCurrentJob: !job.endDate
    };
  });
};