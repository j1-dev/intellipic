export function getPercentage(inputString: string) {
  if (inputString !== null || typeof inputString !== 'undefined') {
    // Split the string by lines
    const lines = inputString.split('\n');

    // Get the last line
    const lastLine = lines[lines.length - 2]; // -2 to skip the last line, which is empty

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
