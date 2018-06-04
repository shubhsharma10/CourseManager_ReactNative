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

    deleteAssignmentWidget(assignmentId) {
        return fetch(constants.GEN_ASSIGNMENT_API_URL.replace('AID', assignmentId),
            {
                method: 'DELETE'
            });
    }

    deleteTrueFalseQuestion(questionId) {
        return fetch(constants.GEN_TRUEFALSE_API_URL.replace('QID', questionId),
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

    findTrueFalseQuestionById(questionId){
        return fetch(constants.GEN_TRUEFALSE_API_URL.replace('QID', questionId))
            .then(response => { return response.json();})
            .catch(function (error) {
                console.log('Error in find true false question: '+error);
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