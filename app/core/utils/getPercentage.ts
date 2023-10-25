export function getProgressTraining(inputString: string) {
  if (inputString !== null || typeof inputString !== 'undefined') {
    // Split the string by lines
    const lines = inputString.split('\n');

    // Get the last line
    let lastLine = '';
    if (lines.length > 2) lastLine = lines[lines.length - 2]; // -2 to skip the last line, which is empty

    if (lastLine.startsWith('#')) {
      // Extract the percentage using regular expression
      const percentageMatch = lastLine.match(/\d+%/);

      if (percentageMatch) {
        // Extracted percentage as a string
        const percentageString = percentageMatch[0];

        // Remove the '%' character and parse as a number
        const percentage = parseFloat(percentageString.replace('%', ''));

        if (!isNaN(percentage)) {
          return percentage.toString();
        }
      }
    }
  }

  // Return -1 to indicate failure
  return '-1';
}

export function getProgressGenerating(inptuString: string) {
  // Split the logs into lines and take the last line
  const lines = inptuString.split('\n');

  const lastLine = lines[lines.length - 2]; // -2 because the last line is empty

  // Extract the percentage using regular expressions
  const percentageMatch = lastLine.match(/\d+%/);

  if (percentageMatch) {
    const percentageString = percentageMatch[0];

    const percentage = parseFloat(percentageString.replace('%', ''));

    console.log(percentage);

    if (!isNaN(percentage)) {
      return percentage.toString();
    }
  } else {
    // Handle the case where no percentage is found
    return '-1';
  }
}
