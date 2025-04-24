function getDateNote(date) {
    const oldDate = new Date(date);
  
    const day = oldDate.getDate();
    const month = oldDate.getMonth() + 1;
    const year = oldDate.getFullYear();
  
    const dayFormatted = String(day).padStart(2, '0');
    const monthFormatted = String(month).padStart(2, '0');

    const newDate = `${dayFormatted}/${monthFormatted}/${year}`;
  
    return newDate
  }
  
  export default getDateNote  