import type { User } from "@/utils/types/user";


/**
 * Calculate user statistics from an array of users.
 *
 * @param {Array} users - Array of user objects.
 * @returns {Object} An object containing various user statistics.
 */
export const calculateUserStatistics = (users: User[]) => {
  let activeCount = 0;
  let loanCount = 0;
  let savingsCount = 0;

  users.forEach(user => {
    if (user.status === "Active") {
      activeCount++;
    }
    if (parseFloat(user.educationEmploymentInfo.loanRepayment.replace(/₦/g, '')) > 0) {
      loanCount++;
    }
    if (parseFloat(user.educationEmploymentInfo.monthlyIncome.replace(/₦/g, '')) > 0) {
      savingsCount++;
    }
  });

  return {
    totalUsers: users.length,
    activeUsers: activeCount,
    usersWithLoans: loanCount,
    usersWithSavings: savingsCount,
  };
};

/**
 * Formats Date
 *
 * @param {string} inputDate - input date
 * @returns {Date} A formatted date value
 */
 export function formatDateString(inputDate: string): string {
     const parts = inputDate.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}) (AM|PM)/);

     if (!parts) {
         return 'Invalid Date';
     }

     let [ , year, month, day, hour, minute, , ampm] = parts;

     // Convert hour to 24-hour format if PM and not 12 PM
     if (ampm === 'PM' && hour !== '12') {
         hour = (parseInt(hour, 10) + 12).toString();
     }

     // Convert hour to 0 if 12 AM
     if (ampm === 'AM' && hour === '12') {
         hour = '00';
     }

     // Create a new date object with all components parsed as numbers
     const date = new Date(
         parseInt(year, 10),
         parseInt(month, 10) - 1, // Month is 0-indexed
         parseInt(day, 10),
         parseInt(hour, 10),
         parseInt(minute, 10)
     );

     // Format the date
     const options: Intl.DateTimeFormatOptions = {
         year: 'numeric',
         month: 'short',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric',
         hour12: true
     };

     return new Intl.DateTimeFormat('en-US', options).format(date);
 }
