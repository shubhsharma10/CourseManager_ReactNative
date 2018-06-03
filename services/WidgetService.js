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
                console.log(response.json())
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
}