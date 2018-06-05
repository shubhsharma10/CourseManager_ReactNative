import * as constants from '../constants/index'

export default class EssayQuestionService {

    static myInstance = null;

    /**
     * @returns {EssayQuestionService}
     */
    static getInstance() {
        if (EssayQuestionService.myInstance === null) {
            EssayQuestionService.myInstance = new EssayQuestionService();
        }

        return this.myInstance;
    }

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
}