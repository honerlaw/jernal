export enum ExceptionID {
    // Auth Failures
    EMAIL_IN_USE = "email:in_use",

    // User Failures
    USER_NOT_FOUND = "user:not_found",
    USER_CREATE_FAILURE = "user:create_failure",

    // Journal Failures
    JOURNAL_NOT_FOUND = "journal:not_found",
    JOURNAL_ENTRY_CREATE_FAILURE = "journal_entry:create_failure"
}