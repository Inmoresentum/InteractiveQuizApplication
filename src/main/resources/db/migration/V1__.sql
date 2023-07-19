CREATE SEQUENCE app_user_seq INCREMENT BY 50 START WITH 1;

CREATE SEQUENCE `created quiz_seq` INCREMENT BY 50 START WITH 1;

CREATE SEQUENCE question_seq INCREMENT BY 50 START WITH 1;

CREATE SEQUENCE token_seq INCREMENT BY 50 START WITH 1;

CREATE TABLE app_user
(
    id                               INT          NOT NULL,
    username                         VARCHAR(255) NOT NULL,
    firstname                        VARCHAR(255) NULL,
    lastname                         VARCHAR(255) NULL,
    email                            VARCHAR(65)  NOT NULL,
    password                         VARCHAR(255) NULL,
    `role`                           VARCHAR(255) NULL,
    profile_pic_url                  VARCHAR(255) NULL,
    phone_number                     VARCHAR(34) NULL,
    date_of_birth                    date NULL,
    account_verified                 BIT(1)       NOT NULL,
    deactivated_by_admin             BIT(1)       NOT NULL,
    about_your_self                  TEXT NULL,
    last_modified_personal_notes     datetime NULL,
    user_address                     VARCHAR(255) NULL,
    user_gender                      VARCHAR(255) NULL,
    account_created                  datetime NULL,
    privacy_policy_and_tos_agreement BIT(1)       NOT NULL,
    version                          INT          NOT NULL,
    CONSTRAINT pk_app_user PRIMARY KEY (id)
);

CREATE TABLE `created quiz`
(
    quiz_id       INT          NOT NULL,
    quiz_title    VARCHAR(255) NOT NULL,
    quiz_synopsis VARCHAR(255) NOT NULL,
    CONSTRAINT pk_created_quiz PRIMARY KEY (quiz_id)
);

CREATE TABLE `created quiz_questions`
(
    quiz_quiz_id          INT NOT NULL,
    questions_question_id INT NOT NULL
);

CREATE TABLE forgot_password_verification_token
(
    id                                    BIGINT AUTO_INCREMENT NOT NULL,
    token                                 VARCHAR(255) NOT NULL,
    created_at                            datetime     NOT NULL,
    expires_at                            datetime     NOT NULL,
    confirmed_at                          datetime NULL,
    forgot_password_verification_token_id INT          NOT NULL,
    CONSTRAINT pk_forgotpasswordverificationtoken PRIMARY KEY (id)
);

CREATE TABLE question
(
    question_id                  INT NOT NULL,
    question                     VARCHAR(255) NULL,
    question_type                INT NULL,
    question_pic                 VARCHAR(255) NULL,
    answer_selection_type        INT NULL,
    message_for_correct_answer   VARCHAR(255) NULL,
    message_for_incorrect_answer VARCHAR(255) NULL,
    explanation                  VARCHAR(255) NULL,
    point                        DOUBLE NULL,
    CONSTRAINT pk_question PRIMARY KEY (question_id)
);

CREATE TABLE question_answers
(
    question_question_id INT NOT NULL,
    answers              VARCHAR(255) NULL
);

CREATE TABLE question_correct_answer
(
    question_question_id INT NOT NULL,
    correct_answer       INT NULL
);

CREATE TABLE token
(
    id         INT    NOT NULL,
    token      VARCHAR(255) NULL,
    token_type VARCHAR(255) NULL,
    revoked    BIT(1) NOT NULL,
    expired    BIT(1) NOT NULL,
    user_id    INT NULL,
    CONSTRAINT pk_token PRIMARY KEY (id)
);

CREATE TABLE user_verification_token
(
    id                         BIGINT AUTO_INCREMENT NOT NULL,
    token                      VARCHAR(255) NOT NULL,
    created_at                 datetime     NOT NULL,
    expires_at                 datetime     NOT NULL,
    confirmed_at               datetime NULL,
    user_verification_token_id INT          NOT NULL,
    CONSTRAINT pk_userverificationtoken PRIMARY KEY (id)
);

ALTER TABLE app_user
    ADD CONSTRAINT uc_app_user_email UNIQUE (email);

ALTER TABLE app_user
    ADD CONSTRAINT uc_app_user_username UNIQUE (username);

ALTER TABLE `created quiz_questions`
    ADD CONSTRAINT uc_created_quiz_questions_questions_questionid UNIQUE (questions_question_id);

ALTER TABLE token
    ADD CONSTRAINT uc_token_token UNIQUE (token);

ALTER TABLE forgot_password_verification_token
    ADD CONSTRAINT FK_FORGOTPASSWORDVERIFICATIONTO_ON_FORGOTPASSWORDVERIFICATIONTO FOREIGN KEY (forgot_password_verification_token_id) REFERENCES app_user (id);

ALTER TABLE token
    ADD CONSTRAINT FK_TOKEN_ON_USER FOREIGN KEY (user_id) REFERENCES app_user (id);

ALTER TABLE user_verification_token
    ADD CONSTRAINT FK_USERVERIFICATIONTOKEN_ON_USER_VERIFICATION_TOKEN FOREIGN KEY (user_verification_token_id) REFERENCES app_user (id);

ALTER TABLE `created quiz_questions`
    ADD CONSTRAINT fk_creque_on_question FOREIGN KEY (questions_question_id) REFERENCES question (question_id);

ALTER TABLE `created quiz_questions`
    ADD CONSTRAINT fk_creque_on_quiz FOREIGN KEY (quiz_quiz_id) REFERENCES `created quiz` (quiz_id);

ALTER TABLE question_answers
    ADD CONSTRAINT fk_question_answers_on_question FOREIGN KEY (question_question_id) REFERENCES question (question_id);

ALTER TABLE question_correct_answer
    ADD CONSTRAINT fk_question_correctanswer_on_question FOREIGN KEY (question_question_id) REFERENCES question (question_id);