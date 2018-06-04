import * as constants from '../constants/index'

export default class WidgetService {

    static myInstance = null;

    /**
     * @returns {WidgetService}
     */
    static getInstance() {
        if (WidgetService.myInstance === null) {
            WidgetService.myInstance = new WidgetService();
        }

        return this.myInstance;
    }

    createAssignmentWidget(topicId,assignment) {
        return fetch(constants.ASSIGNMENT_API_URL
                .replace('TID', topicId),
            {
                body: JSON.stringify(assignment),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response;
            });
    }

    createExamWidget(topicId,exam) {
        return fetch(constants.EXAM_API_URL
                .replace('TID', topicId),
            {
                body: JSON.stringify(exam),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response;
            });
    }

    /////////////////////////////
    /// True False Question methods
    //////////////////////////////

    createTrueFalseQuestion(examId,question) {
        return fetch(constants.TRUEFALSE_API_URL
                .replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response;
            });
    }

    updateTrueFalseQuestion(questionId,question) {
        return fetch(constants.GEN_TRUEFALSE_API_URL.replace('QID', questionId), {
            method: 'put',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response){
                return response;
            })
            .catch(function (error) {
                console.log("Update true false question promise error :: "+error);
                return null;
            });
    }

    deleteTrueFalseQuestion(questionId) {
        return fetch(constants.GEN_TRUEFALSE_API_URL.replace('QID', questionId),
            {
                method: 'DELETE'
            });
    }

    findTrueFalseQuestionById(questionId){
        return fetch(constants.GEN_TRUEFALSE_API_URL.replace('QID', questionId))
            .then(response => { return response.json();})
            .catch(function (error) {
                console.log('Error in find true false question: '+error);
                return null;
            });
    }


    ///////////////////////////////
    /// Essay question methods
    //////////////////////////////

    createEssayQuestion(examId,question) {
        return fetch(constants.ESSAY_API_URL
                .replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response;
            });
    }

    updateEssayQuestion(questionId,question) {
        return fetch(constants.GEN_ESSAY_API_URL.replace('QID', questionId), {
            method: 'put',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response){
                return response;
            })
            .catch(function (error) {
                console.log("Update essay question promise error :: "+error);
                return null;
            });
    }

    deleteEssayQuestion(questionId) {
        return fetch(constants.GEN_ESSAY_API_URL.replace('QID', questionId),
            {
                method: 'DELETE'
            });
    }

    findEssayQuestionById(questionId){
        return fetch(constants.GEN_ESSAY_API_URL.replace('QID', questionId))
            .then(response => { return response.json();})
            .catch(function (error) {
                console.log('Error in find essay question: '+error);
                return null;
            });
    }


    ///////////////////////////////
    /// Multiple choice question methods
    //////////////////////////////

    createMultipleChoiceQuestion(examId,question) {
        return fetch(constants.MULTIPLE_CHOICE_API_URL
                .replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response;
            });
    }

    updateMultipleChoiceQuestion(questionId,question) {
        return fetch(constants.GEN_MULTIPLE_CHOICE_API_URL.replace('QID', questionId), {
            method: 'put',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response){
                return response;
            })
            .catch(function (error) {
                console.log("Update multiple choice question promise error :: "+error);
                return null;
            });
    }

    deleteMultipleChoiceQuestion(questionId) {
        return fetch(constants.GEN_MULTIPLE_CHOICE_API_URL.replace('QID', questionId),
            {
                method: 'DELETE'
            });
    }

    findMultipleChoiceQuestionById(questionId){
        return fetch(constants.GEN_MULTIPLE_CHOICE_API_URL.replace('QID', questionId))
            .then(response => { return response.json();})
            .catch(function (error) {
                console.log('Error in find multiple choice question: '+error);
                return null;
            });
    }

     ///////////////////////////////
    /// Fill in the blanks question methods
    //////////////////////////////

    createBlanksQuestion(examId,question) {
        return fetch(constants.BLANKS_API_URL
                .replace('EID', examId),
            {
                body: JSON.stringify(question),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            })
            .then(function (response) {
                return response;
            });
    }

    updateBlanksQuestion(questionId,question) {
        return fetch(constants.GEN_BLANKS_API_URL.replace('QID', questionId), {
            method: 'put',
            body: JSON.stringify(question),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response){
                return response;
            })
            .catch(function (error) {
                console.log("Update fill in the blanks question promise error :: "+error);
                return null;
            });
    }

    deleteBlanksQuestion(questionId) {
        return fetch(constants.GEN_BLANKS_API_URL.replace('QID', questionId),
            {
                method: 'DELETE'
            });
    }

    findBlanksQuestionById(questionId){
        return fetch(constants.GEN_BLANKS_API_URL.replace('QID', questionId))
            .then(response => { return response.json();})
            .catch(function (error) {
                console.log('Error in find fill in the blanks question: '+error);
                return null;
            });
    }

    ////////////////////////////////////////

    updateAssignmentWidget(assignmentId,assignment) {
        return fetch(constants.GEN_ASSIGNMENT_API_URL.replace('AID', assignmentId), {
                method: 'put',
                body: JSON.stringify(assignment),
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(function(response){
                return response;
            })
            .catch(function (error) {
                console.log("Update assignment widget promise error :: "+error);
                return null;
            });
    }

    deleteAssignmentWidget(assignmentId) {
        return fetch(constants.GEN_ASSIGNMENT_API_URL.replace('AID', assignmentId),
            {
                method: 'DELETE'
            });
    }



    findAssignmentWidgetById(widgetId) {
        return fetch(constants.GEN_ASSIGNMENT_API_URL.replace('AID', widgetId))
            .then(response => { return response.json();})
            .catch(function (error) {
                console.log('Error in find assignment widget: '+error);
                return null;
            });
    }

    findExamWidgetById(widgetId) {
        return fetch(constants.GEN_EXAM_API_URL.replace('EID', widgetId))
            .then(response => { return response.json();})
            .catch(function (error) {
                console.log('Error in find exam widget: '+error);
                return null;
            });
    }

    updateExamWidget(examId,exam) {
        return fetch(constants.GEN_EXAM_API_URL.replace('EID', examId), {
            method: 'put',
            body: JSON.stringify(exam),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(function(response){
                return response;
            })
            .catch(function (error) {
                console.log("Update exam widget promise error :: "+error);
                return null;
            });
    }

    deleteExamWidget(examId) {
        return fetch(constants.GEN_EXAM_API_URL.replace('EID', examId),
            {
                method: 'DELETE'
            });
    }

    findAllWidgetsForTopic(topicId) {
        return fetch(constants.WIDGET_API_URL.replace('TID', topicId))
            .then(response => { return response.json();})
            .catch(function (error) {
                console.log('Error in find widgets for topic: '+error);
                return null;
            });
    }

    findAllQuestionsForExam(examId) {
        return fetch(constants.QUESTION_API_URL.replace('EID', examId))
            .then(response => { return response.json();})
            .catch(function (error) {
                console.log('Error in find widgets for topic: '+error);
                return null;
            });
    }
}