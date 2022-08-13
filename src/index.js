import {createStore} from 'redux'

let recordState;
const initialState=[]

const reducer=function(state=initialState,action){
    recordState=state;
   
    switch(action.type){
        case "addBook":
            return [...state,{bookId:action.info.bookId,bookName:`<<${action.info.bookName}>>`}]
        case "delBook":
            console.log('action',action)
            return state.filter(item=>item.bookId!=action.info.bookId)

        default:
            return [...state]
    }
}

const store=createStore(reducer)

const root=document.getElementById('app')
const addBook=document.getElementById('addBook')
const delBook=document.getElementById('delBook')
const bookList=document.getElementById('bookList')

const addBookBtn=document.createElement('button');
const bookNameInput=document.createElement('input');
const delBookBtn=document.createElement('button');
const bookIdInput=document.createElement('input');

addBookBtn.innerText='ADD BOOK'
delBookBtn.innerText='DEL BOOK'

function* generateID(){
    let id=0;
    while(true){
        yield id++;
    }
}

const generateId=generateID()
const genBookId=()=>generateId.next().value;


const addBookFn=()=>{
    const bookName=bookNameInput.value;
    if(bookName){
        const bookId=genBookId()
        bookNameInput.value=''
        const action={
            type:'addBook',
            info:{
                bookId,
                bookName
            }
        }
        store.dispatch(action)
    }

}

const delBookFn=()=>{
   const bookId=bookIdInput.value;
   if(bookId){
     bookIdInput.value="";
     const action={
        type:'delBook',
        info:{
            bookId
        }
     }
     store.dispatch(action)
   }
}


addBookBtn.addEventListener('click',addBookFn)
delBookBtn.addEventListener('click',delBookFn)



addBook.appendChild(bookNameInput);
addBook.appendChild(addBookBtn);

delBook.appendChild(bookIdInput);
delBook.appendChild(delBookBtn);

const showState=store.subscribe(()=>{
    console.log('old state',recordState);
    console.log('new state',store.getState());
})

const showNewList=store.subscribe(()=>{
    const currentState=store.getState();
    if(currentState.length!==recordState.length){
        bookList.innerText="";
        currentState.forEach((element)=>{
            bookList.appendChild(createBookList(element))
        })
    }

})

function createBookList(info){
    const element=document.createElement('li');
    element.innerText=`BookID: ${info.bookId} BookName: ${info.bookName}`
    return element;
}