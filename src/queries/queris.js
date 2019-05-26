import {gql} from 'apollo-boost';

const addUserMutation=gql`
    mutation($email: String!, $password: String!){
        register(email: $email,password: $password){
            path
            message
        }
    }
`;

const loginUserMutation=gql`
    mutation($email: String!, $password: String!){
        login(email: $email,password: $password){
            path
            message
        }
    }
`;

const meQuery=gql`
	query MeQuery{
		me{
			email
            id
            nots{
            notification
                date
                _id
            }
		}
	}
`;

const youtubeQuery=gql`
    mutation ($query: String!){
        youtubesearch(query:$query){
            link
            text
            image
        }
    }
`;

const searchQuestion=gql`
    mutation ($searchText: String!){
        searchQuestion(searchText:$searchText){
            Question
            _id
        }
    }
`;

const addQuestion = gql`
    mutation ($question: String!, $explanation: String){
        addQuestion(
            question: $question
            explanation: $explanation
        ){
            path
            message
        }
    }
`;

const addAnswer = gql`
    mutation ($questionid: String!, $answer: String!){
        addAnswer(
            questionid: $questionid
            answer: $answer
        )
    }
`;

const searchQuestionWithAnswer = gql`
    query ($questionid: String!){
        searchQuestionWithAnswer(questionid:$questionid){
            Question
            Explanation
            date
            _id
            user{
                email
            }
            answers{
                Answer
                _id
                date
                user{
                    email
                }
            }
        }
    }
`;

const singleBlog=gql`
    query($blogid: String!){
        singleBlog(blogid: $blogid){
            Blog
            Title
            user{
                email
            }
        }
    }
`;

const blogByUser=gql`
    query blogByUser($userid: String!){
        blogByUser(userid: $userid){
            _id
            Title
            Blog
            date
            prefferedImage
        }
    }
`;

const questionByUser=gql`
    query questionByUser($userid: String!){
        questionByUser(userid: $userid){
            Question
            Explanation
            length
            date
            _id
        }
    }
`;

const newsQuery=gql`
    query{
        news{
            link
            thumbnail
            heading
            para
        }
    }
`;

const AllQuestionsQuery=gql`
    query AllQuestionsQuery{
        questions{
            Question
            _id
            date
            user{
                email
            }
        }
    }
`;


const addBlog = gql`
    mutation ($title: String!, $blog: String!){
        addBlog(
            title: $title
            blog: $blog
        ){
            path
            message
        }
    }
`;

const AllBlogs=gql`
    query AllBlogs{
        blogs{
            Blog
            Title
            _id
            date
            prefferedImage
            user{
                email
            }
        }
    }
`;

const searchBlog=gql`
    mutation ($searchText: String!){
        searchBlog(searchText:$searchText){
            Title
            _id
        }
    }
`;

const addSHC=gql`
    mutation ($n:Float,$p:Float,$k:Float,$ph:Float,$temp:Float,$organ:Float,$yield1:Float){
        addSHC(n:$n,p:$p,k:$k,ph:$ph,temp:$temp,organ:$organ,yield1:$yield1){
            path 
            message
        }
    }
`;

const feedBlog=gql`
    query ($searchText: String!){
        searchBlog(searchText:$searchText){
            Title
            _id
            date
            Blog
            prefferedImage
            user{
                email
            }
        }
    }
`;

const SHCInfo=gql`
    query ($userid: String!){
        SHCInfo(userid:$userid){
            nitrogen
            phos
            potassium
            ph
            temp
            organ
            yield
        }
    }
`;

const fertInfo=gql`
    query ($userid: String!){
        fertInfo(userid:$userid){
            date
            _id
        }
    }
`;

const notifications=gql`
    query ($userid: String!){
        notifications(userid:$userid){
            notification
            date
            userid
            _id
        }
    }
`;

const addFert=gql`
    mutation {
        addFert{
            path
            message
        }
    }
`;

const logout=gql`
    mutation {
        logout
    }
`;



export {notifications, fertInfo, addFert, SHCInfo, addSHC, feedBlog, questionByUser, blogByUser, logout, addUserMutation, singleBlog, searchBlog, loginUserMutation, meQuery, youtubeQuery, newsQuery, AllQuestionsQuery, searchQuestion, addQuestion, searchQuestionWithAnswer, addAnswer, addBlog, AllBlogs};