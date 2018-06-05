import * as constants from '../constants/index'

export default class MultipleChoiceQuestionService {

    static myInstance = null;

    /**
     * @returns {MultipleChoiceQuestionService}
     */
    static getInstance() {
        if (MultipleChoiceQuestionService.myInstance === null) {
            MultipleChoiceQuestionService.myInstance = new MultipleChoiceQuestionService();
        }

        return this.myInstance;
    }

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
}