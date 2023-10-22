export const convertFirebaseTimeStampToJS = (time) => {
    if (time && time.toDate) {
      const jsDate = time.toDate();
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
  
      return new Intl.DateTimeFormat('en-US', options).format(jsDate);
    }
    return 'N/A';
  };