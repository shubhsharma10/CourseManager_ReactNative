import React from 'react';
import {createStackNavigator} from 'react-navigation'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import TopicList from './components/TopicList'
import WidgetList from './components/WidgetList'
import AssignmentWidget from './elements/AssignmentWidget'
import ExamWidget from './elements/ExamWidget'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import EssayQuestionEditor from './elements/EssayQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import FillInTheBlanksQuestionEditor from './elements/FillInTheBlanksQuestionEditor'
import Home from './components/Home'


const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    TopicList,
    WidgetList,
    AssignmentWidget,
    ExamWidget,
    TrueFalseQuestionEditor,
    EssayQuestionEditor,
    MultipleChoiceQuestionEditor,
    FillInTheBlanksQuestionEditor
});

export default App;
