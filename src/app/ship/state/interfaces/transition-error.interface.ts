/**
 * Error report about transition
 */
export interface TransitionErrorInterface {
  /**
   * HTTP error code
   */
  httpCode: string;

  /**
   * HTTP URL
   */
  httpURL: string;

  /**
   * Error code
   */
  code: string;

  /**
   * Error message
   */
  message: string;

  /**
   * Flag to know the interface
   */
  isTransitionErrorInterface: true;
}
