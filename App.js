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
    TrueFalseQuestionEditor
});

export default App;
