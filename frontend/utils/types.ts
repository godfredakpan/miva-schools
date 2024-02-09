

export interface CourseListProps {
    courses: Course[];
  }
  
  export interface Course {
    [x: string]: any;
    _id: number;
    name: string;
    backgroundImage: string;
  }
  
  export interface VideoListProps {
    videos: Video[];
  }
  
  export interface Video {
    _id: any;
    title: string;
    url: string;
    description: string;
  }
  
  export interface QuizzesProps {
    quizzes: Quiz[];
  }
  
  export interface User {
    _id: any;
    name: string;
    email: string;
  }

  export interface QuestionProps {
    question: string;
    options: string[];
    correctAnswer: string;
    onSelect: (selectedOption: string) => void;
    selectedOption: string | null;
  }


  export interface Quiz {
    id: number;
    title: string;
    questions: {
        question: string;
        options: string[];
        correctAnswer: string;
    }[];
}