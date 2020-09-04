export enum ExceptionID {
    AUTH_LOGIN = "error.auth.login",

    // User Failures
    USER_NOT_FOUND = "error.user.not_found",
    USER_CREATE_FAILURE = "error.user.create.failure",
    USER_CREATE_FAILURE_EMAIL_IN_USE = "error.user.create.email_in_use",

    // Journal Failures
    JOURNAL_NOT_FOUND = "error.journal.not_found",
    JOURNAL_ENTRY_CREATE_FAILURE = "error.journal_entry.create.failure"
}