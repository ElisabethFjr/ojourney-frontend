import format from 'date-fns/format';

// Function to format dates before sending them to the server
const changeDateFormat = (date: Date) => {
  return format(date, 'yyyy-MM-dd');
};

export default changeDateFormat;
