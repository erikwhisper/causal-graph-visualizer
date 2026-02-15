export class ErrorHandler {
  static handle(error, context, options = {}) {
    const {
      showAlert = true,
      logToConsole = true,
      customMessage = null,
    } = options;

    //1. Extract error message
    const errorMessage = error instanceof Error ? error.message : String(error);

    //2. Log to console
    if (logToConsole) {
      console.error(`[${context}]`, error);
    }

    //3. Show user notification
    if (showAlert) {
      const displayMessage = customMessage || errorMessage;
      alert(`Error in ${context}:\n\n${displayMessage}`);
    }
  }

  static warn(message, context) {
    console.warn(`[${context}]`, message);
  }

  static info(message, context) {
    console.log(`[${context}]`, message);
  }

  static handleValidation(error, fieldName) {
    this.handle(error, `Validation: ${fieldName}`, {
      customMessage: `Invalid value for ${fieldName}:\n${error.message}`,
    });
  }
}
