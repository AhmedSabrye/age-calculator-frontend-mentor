import { useState } from 'react'
import styled from 'styled-components'

type newErrors = {
  day?: string
  month?: string
  year?: string
}
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsl(0, 0%, 94%);
  font-family: 'Poppins', sans-serif;
`

const Card = styled.div`
  background-color: white;
  padding: 43px 56px;
  border-radius: 24px 24px 200px 24px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 840px;
  margin: 20px 0 100px 0;
`

const InputGroup = styled.div`
  display: flex;
  gap: 32px;
  margin: 10px 0 33px 0;
  // padding-bottom:25px;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 160px;
`

const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: hsl(0, 1%, 44%);
  letter-spacing: 0.25em;
  text-transform: uppercase;
`

const Input = styled.input`
  width: 100%;
  padding: 17px 24px;
  border: 1px solid hsl(0, 0%, 86%);
  border-radius: 8px;
  font-size: 32px;
  font-weight: 700;
  color: hsl(0, 0%, 8%);

  &:focus {
    outline: none;
    border-color: hsl(259, 100%, 65%);
  }

  &::placeholder {
    color: hsl(0, 0.00%, 50.60%);
    font-weight: bold;
  font-family: 'Poppins', sans-serif;

  }
`

const Divider = styled.div`
  position: relative;
  height: 1px;
  background-color: hsl(0, 0%, 86%);
  margin: 50px 0 35px 0;
`

const Button = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background-color: hsl(259, 100%, 65%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: hsl(0, 0%, 8%);
  }
`

const Result = styled.div`
  padding: 12px 0 12px 0;
  font-size: 104px;
  font-weight: 800;
  letter-spacing: -2px;
  font-style: italic;
  line-height: 1.1;
`

const Span = styled.span`
  color: hsl(259, 100%, 65%);
  letter-spacing: 1rem;
  margin-right:-5px;
`

const ErrorMessage = styled.p`
  color: hsl(0, 100%, 67%);
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
  margin-top: 8px;
  text-align: left;
  min-height: 20px;
`

function App() {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [age, setAge] = useState({ years: '--', months: '--', days: '--' })
  const [errors, setErrors] = useState<newErrors>({})

  const isValidDate = (day: number, month: number, year: number) => {
    const date = new Date(year, month - 1, day)
    return date.getDate() === day &&
           date.getMonth() === month - 1 &&
           date.getFullYear() === year
  }

  const validateInputs = () => {
    const newErrors: newErrors = {}
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    if (!day) {
      newErrors.day = 'This field is required'
    } else if (parseInt(day) < 1 || parseInt(day) > 31) {
      newErrors.day = 'Must be a valid day'
    } else if (month && year && !isValidDate(parseInt(day), parseInt(month), parseInt(year))) {
      newErrors.day = 'Must be a valid date'
    }

    if (!month) {
      newErrors.month = 'This field is required'
    } else if (parseInt(month) < 1 || parseInt(month) > 12) {
      newErrors.month = 'Must be a valid month'
    }

    if (!year) {
      newErrors.year = 'This field is required'
    } else if (parseInt(year) > currentYear) {
      newErrors.year = 'Must be in the past'
    }

    // Check if date is valid
    if (day && month && year) {
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      if (date.getDate() !== parseInt(day)) {
        newErrors.day = 'Must be a valid date'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateAge = () => {
    if (!validateInputs()) return

    const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    const currentDate = new Date()

    let years = currentDate.getFullYear() - birthDate.getFullYear()
    let months = currentDate.getMonth() - birthDate.getMonth()
    let days = currentDate.getDate() - birthDate.getDate()

    if (months < 0 || (months === 0 && days < 0)) {
      years--
      months += 12
    }

    if (days < 0) {
      const lastMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        0
      )
      days += lastMonth.getDate()
      months--
    }

    setAge({ years: years.toString(), months: months.toString(), days: days.toString() })
  }

  return (
    <Container>
      <Card>
        <InputGroup>
          <InputWrapper>
            <Label style={{ color: errors.day ? 'hsl(0, 100%, 67%)' : undefined }}>
              Day
            </Label>
            <Input
              type="number"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              style={{
                borderColor: errors.day ? 'hsl(0, 100%, 67%)' : undefined,
              }}
            />
            {errors.day && <ErrorMessage>{errors.day}</ErrorMessage>}
          </InputWrapper>
          <InputWrapper>
            <Label
              style={{ color: errors.month ? 'hsl(0, 100%, 67%)' : undefined }}
            >
              Month
            </Label>
            <Input
              type="number"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              style={{
                borderColor: errors.month ? 'hsl(0, 100%, 67%)' : undefined,
              }}
            />
            {errors.month && <ErrorMessage>{errors.month}</ErrorMessage>}
          </InputWrapper>
          <InputWrapper>
            <Label
              style={{ color: errors.year ? 'hsl(0, 100%, 67%)' : undefined }}
            >
              Year
            </Label>
            <Input
              type="number"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{
                borderColor: errors.year ? 'hsl(0, 100%, 67%)' : undefined,
              }}
            />
            {errors.year && <ErrorMessage>{errors.year}</ErrorMessage>}
          </InputWrapper>
        </InputGroup>

        <Divider>
          <Button onClick={calculateAge}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="44"
              viewBox="0 0 46 44"
            >
              <g fill="none" stroke="#FFF" strokeWidth="2">
                <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
              </g>
            </svg>
          </Button>
        </Divider>

        <Result>
          <div>
            <Span>{age.years}</Span>years
          </div>
          <div>
            <Span>{age.months}</Span>months
          </div>
          <div>
            <Span>{age.days}</Span>days
          </div>
        </Result>
      </Card>
    </Container>
  )
}

export default App
