import * as constants from '../constants/index'

export default class TrueFalseQuestionService {

    static myInstance = null;

    /**
     * @returns {TrueFalseQuestionService}
     */
    static getInstance() {
        if (TrueFalseQuestionService.myInstance === null) {
            TrueFalseQuestionService.myInstance = new TrueFalseQuestionService();
        }

        return this.myInstance;
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
}