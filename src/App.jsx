// import React, { useEffect, useRef, useState } from 'react'

// const App = () => {
//   const [loading, setLoading] = useState(true)
//   const [questions, setQuestions] = useState(null)
//   const [index, setIndex] = useState(0)
//   const [error, setError] = useState(false)
//   const [result, setResult] = useState(0)

//   const input = useRef([])

//   useEffect(() => {
//     fetch('https://the-trivia-api.com/v2/questions')
//       .then(res => res.json())
//       .then(res => {
//         setQuestions(res)
//       }).catch((err) => {
//         console.error(err)
//         setError(true)
//       }).finally(() => {
//         setLoading(false)
//       })
//   }, [])

//   function shuffleArray(arr) {
//     const emptyArr = []
//     const shuffleArr = []
//     for (let i = 0; i < arr.length; i++) {
//       const randomNumber = Math.floor(Math.random() * arr.length)
//       if (emptyArr.includes(randomNumber)) {
//         i--
//       } else {
//         emptyArr.push(randomNumber)
//         shuffleArr[randomNumber] = arr[i]
//       }
//     }
//     return shuffleArr
//   }

//   function nextQuestion() {
//     const selectedOption = input.current.find(item => item && item.checked)
//     if (!selectedOption) return

//     if (questions[index].correctAnswer === selectedOption.value) {
//       setResult(result + 10)
//     }
//     if (index < questions.length - 1) {
//       setIndex(index + 1)
//     }
//   }

//   if (loading) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <span className="loading loading-spinner text-primary text-3xl"></span>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className='flex justify-center items-center h-screen'>
//         <h1 className='text-3xl font-semibold text-red-400'>An error occurred while loading questions.</h1>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 space-y-6">
//         <h1 className="text-3xl font-bold text-center text-blue-600"> Quiz App</h1>
//         <div className="flex justify-between items-center text-lg font-medium text-gray-700">
//           <span>Question {index + 1} of {questions.length}</span>
//           <span>Score: <span className="text-green-600">{result}</span> / 100</span>
//         </div>

//         <div className="text-xl font-semibold text-gray-800">
//           {questions && questions[index]?.question.text}
//         </div>

//         <div className="space-y-3">
//           {shuffleArray([...questions[index].incorrectAnswers, questions[index].correctAnswer]).map((item, i) => (
//             <div key={i} className="flex items-center gap-3">
//               <input
//                 type="radio"
//                 name="question"
//                 value={item}
//                 id={`option-${i}`}
//                 ref={el => input.current[i] = el}
//                 className="accent-blue-500"
//               />
//               <label htmlFor={`option-${i}`} className="text-gray-700">{item}</label>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-end">
//           <button
//             onClick={nextQuestion}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition duration-200"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default App




import React, { useEffect, useRef, useState } from 'react'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState(null)
  const [index, setIndex] = useState(0)
  const [error, setError] = useState(false)
  const [result, setResult] = useState(0)

  const input = useRef([])

  useEffect(() => {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      .then(res => setQuestions(res))
      .catch(err => {
        console.error(err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [])

  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5)
  }

  function nextQuestion() {
    const selected = input.current.find(item => item && item.checked)
    if (!selected) return

    if (questions[index].correctAnswer === selected.value) {
      setResult(result + 10)
    }
    if (index < questions.length - 1) {
      setIndex(index + 1)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Something went wrong. Please try again.
      </div>
    )
  }

  return (

    
    <div className=" min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-xl rounded-lg p-6 space-y-6 border">
        <h1 className="text-2xl font-semibold text-center">Quiz App</h1>
        <div className="flex justify-between text-sm text-gray-600">
          <p>Question {index + 1} of {questions.length}</p>
          <p>Score: {result} / 100</p>
        </div>

        <div>
          <p className="text-lg font-medium mb-4">
            {questions[index].question.text}
          </p>
          <div className="space-y-2">
            {shuffleArray([
              ...questions[index].incorrectAnswers,
              questions[index].correctAnswer,
            ]).map((option, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="question"
                  value={option}
                  id={`option-${i}`}
                  ref={el => input.current[i] = el}
                  className="accent-gray-600"
                />
                <label htmlFor={`option-${i}`} className="text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={nextQuestion}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
