import * as constants from '../constants/index'

export default class FillInTheBlanksQuestionService {

    static myInstance = null;

    /**
     * @returns {FillInTheBlanksQuestionService}
     */
    static getInstance() {
        if (FillInTheBlanksQuestionService.myInstance === null) {
            FillInTheBlanksQuestionService.myInstance = new FillInTheBlanksQuestionService();
        }

        return this.myInstance;
    }

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
}