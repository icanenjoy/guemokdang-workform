import { useState } from 'react'
import styled from 'styled-components'

const vars = {
    bg: '#f8f9fb',
    card: '#ffffff',
    muted: '#6b7280',
    border: '#e6e9ef',
    accent: '#1f6feb',
    radius: '8px',
    pad: '16px',
}

const Container = styled.div`
    display: flex;
    gap: 24px;
    align-items: flex-start;
    padding: 24px;
    padding-bottom: 160px;
    box-sizing: border-box;
    font-family:
        -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR',
        'Helvetica Neue', Arial;
`

const FormWrapper = styled.form`
    flex: 1;
    min-width: 320px;
    max-width: 720px;
    background: transparent;
`

const Fields = styled.div`
    display: grid;

    gap: 12px;
    margin-bottom: 12px;
`

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`

const Label = styled.label`
    font-size: 13px;
    color: #111827;
    font-weight: 600;
`

const NumberInput = styled.input.attrs({ type: 'number' })`
    padding: 8px 10px;
    border: 1px solid ${vars.border};
    border-radius: 6px;
    background: ${vars.card};
    outline: none;
    font-size: 14px;
    color: #111827;
    text-align: right;
    &:focus {
        border-color: rgba(31, 111, 235, 0.18);
        box-shadow: 0 6px 18px rgba(31, 111, 235, 0.06);
    }
`

const Preview = styled.aside`
    flex: 1;
    min-width: 300px;
    max-width: 520px;
    background: ${vars.bg};
    border-left: 1px solid ${vars.border};
    padding: ${vars.pad};
    border-radius: 6px;
    box-sizing: border-box;
`

const PreviewTitle = styled.div`
    font-weight: 700;
    margin-bottom: 8px;
`

const SubmittedTime = styled.div`
    font-size: 12px;
    color: ${vars.muted};
    margin-bottom: 12px;
`

const Pre = styled.pre`
    background: ${vars.card};
    padding: 12px;
    border-radius: 6px;
    border: 1px solid ${vars.border};
    font-family:
        ui-monospace, SFMono-Regular, Menlo, Monaco, 'Noto Sans Mono', monospace;
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 13px;
    color: #111827;
    margin: 0;
`
const FixedSubmit = styled.button`
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
    z-index: 1000;
    background: ${vars.accent};
    color: #fff;
    border: none;
    padding: 10px 18px;
    border-radius: 999px;
    box-shadow: 0 8px 30px rgba(31, 111, 235, 0.18);
    cursor: pointer;
    font-weight: 600;
    transition:
        transform 0.12s ease,
        box-shadow 0.12s ease,
        opacity 0.12s ease;
    &:hover {
        transform: translateX(-50%) translateY(-3px);
        box-shadow: 0 12px 36px rgba(31, 111, 235, 0.22);
    }
    &:active {
        transform: translateX(-50%) translateY(0);
        opacity: 0.95;
    }

    /* 모바일에서 버튼을 화면 폭에 맞게 */
    @media (max-width: 600px) {
        left: 16px;
        right: 16px;
        transform: none;
        width: calc(100% - 32px);
        bottom: 16px;
        border-radius: 12px;
    }
`
const Divider = styled.div`
    grid-column: 1 / -1;
    height: 1px;
    background: ${vars.border};
    border-radius: 2px;
    margin: 8px 0;
`
export default function CheckForm({ onSubmit }) {
    const [form, setForm] = useState({
        ssanghwaHotHall: '',
        ssanghwaIceHall: '',
        sujeonggwaHotHall: '',
        sujeonggwaIceHall: '',
        omijaHotHall: '',
        omijaIceHall: '',
        coffeeHotHall: '',
        coffeeIceHall: '',
        patjukHall: '',
        sweetPatjukHall: '',
        seoulHall: '',
        hodugwajaHall: '',
        lemonHall: '',
        pumkinHall: '',
        ssanghwaHotTakeout: '',
        ssanghwaIceTakeout: '',
        sujeonggwaHotTakeout: '',
        sujeonggwaIceTakeout: '',
        omijaHotTakeout: '',
        omijaIceTakeout: '',
        coffeeHotTakeout: '',
        coffeeIceTakeout: '',
        ssanghwabottle: '',
        sujeonggwaBottle: '',
        omijaBottle: '',
        patjukTakeout: '',
        sweetPatjukTakeout: '',
        seoulTakeout: '',
        hodoogwajaTakeout: '',
        lemonTakeout: '',
        patjukPouch: '',
        sweetPatjukPouch: '',
        pumkinPouch: '',
        // weight fields (소수점 허용)
        omijaWeight: '',
        ssanghwaWeight: '',
        sujeonggwaWeight: '',
        hodugwaWeight: '',
    })

    const [submitted, setSubmitted] = useState(null)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        if (type === 'checkbox') {
            setForm((prev) => ({ ...prev, [name]: checked }))
            return
        }
        if (type === 'number') {
            const parsed = parseFloat(value)
            const newValue = isNaN(parsed) ? 0 : parsed // 소수점 허용
            setForm((prev) => ({ ...prev, [name]: newValue }))
            return
        }
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const validate = () => {
        // 간단 검증: 모든 숫자가 음수가 아닌지 확인
        for (const key in form) {
            if (Object.prototype.hasOwnProperty.call(form, key)) {
                const v = form[key]
                if (typeof v === 'number' && v < 0) return false
            }
        }
        return true
    }

    const formatReport = (storeName, dateTitle, f) => {
        const lines = []
        lines.push(`${storeName} ${dateTitle}`)
        lines.push('메뉴 피드백 올려드립니다.\n')

        // helper
        const addMenu = (title, hallKey, takeoutKey, pouchKey) => {
            const hall = f[hallKey] || 0
            const takeout = f[takeoutKey] || 0
            const pouch = pouchKey ? f[pouchKey] || 0 : null

            lines.push(`•${title}`)
            lines.push(`총 판매 수량 : 매장 ${hall} + 포장 ${takeout}`)
            if (pouchKey) lines.push(`총 판매 수량(파우치) : 포장 ${pouch}`)
            lines.push(
                `직원 피드백 : ${hall === 0 ? '-' : hall > 1 ? '모두 빈 그릇으로 회수되었습니다.' : '빈 그릇으로 회수되었습니다.'}\n`
            )
        }

        const addDrink = (
            title,
            iceHallKey,
            iceTakeoutKey,
            hotHallKey,
            hotTakeoutKey,
            bottleKey
        ) => {
            const iceHall = f[iceHallKey] || 0
            const iceTake = f[iceTakeoutKey] || 0
            const hotHall = f[hotHallKey] || 0
            const hotTake = f[hotTakeoutKey] || 0
            const bottle = f[bottleKey] || 0

            lines.push(`•${title}`)
            lines.push(
                `총 판매 수량 : 매장 ${iceHall} + 포장 ${iceTake} / 핫 ${hotHall} + 포장 ${hotTake} / 병입 ${bottle}`
            )
            lines.push(
                `직원 피드백 : ${iceHall + hotHall === 0 ? '-' : iceHall + hotHall > 1 ? '모두 빈 잔으로 회수되었습니다.' : '빈 잔으로 회수되었습니다.'}\n`
            )
        }

        // Build each menu using available fields
        // 서울빙수
        addMenu('서울빙수', 'seoulHall', 'seoulTakeout', null)

        // 레몬 진저 빙수
        addMenu('레몬 진저 빙수', 'lemonHall', 'lemonTakeout', null)

        // 금옥팥죽
        addMenu('금옥팥죽', 'patjukHall', 'patjukTakeout', 'patjukPouch')

        // 단팥죽
        addMenu(
            '단팥죽',
            'sweetPatjukHall',
            'sweetPatjukTakeout',
            'sweetPatjukPouch'
        )

        // 단호박죽
        addMenu('단호박죽', 'pumkinHall', 'pumkinTakeout', 'pumkinPouch')

        //오미자
        addDrink(
            `오미자 (총 ${f.omijaWeight || 0}kg)`,
            'omijaIceHall',
            'omijaIceTakeout',
            'omijaHotHall',
            'omijaHotTakeout',
            'omijaBottle'
        )

        addDrink(
            `쌍화차 (조청 포함 총 ${f.ssanghwaWeight || 0}kg, 비정제 설탕 7g)`,
            'ssanghwaIceHall',
            'ssanghwaIceTakeout',
            'ssanghwaHotHall',
            'ssanghwaHotTakeout',
            'ssanghwabottle'
        )

        addDrink(
            `수정과 (사과즙 포함 총 ${f.sujeonggwaWeight || 0}kg)`,
            'sujeonggwaIceHall',
            'sujeonggwaIceTakeout',
            'sujeonggwaHotHall',
            'sujeonggwaHotTakeout',
            'sujeonggwaBottle'
        )

        addDrink(
            `커피 `,
            'coffeeIceHall',
            'coffeeIceTakeout',
            'coffeeHotHall',
            'coffeeHotTakeout',
            'coffeeBottle'
        )

        // 호두과자
        {
            lines.push(`•호두과자 (${f.hodugwaWeight || 0}배치 제조)`)
            lines.push(
                `총 판매 수량 : ${(f.hodugwajaHall || 0) + (f.hodugwajaTakeout || 0)} 세트`
            )
            lines.push(
                `직원 피드백 : ${(f.hodugwajaHall || 0) + (f.hodugwajaTakeout || 0) === 0 ? '-' : '금일 특이사항 없습니다.'}\n`
            )
        }

        return lines.join('\n')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return
        const payload = { ...form }

        const today = new Date()
        const weekdayNames = ['일', '월', '화', '수', '목', '금', '토']
        const titleDate = `${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(today.getDate()).padStart(2, '0')}일 (${weekdayNames[today.getDay()]})`
        const report = formatReport('[서초점]', titleDate, payload)

        setSubmitted(report)

        if (onSubmit && typeof onSubmit === 'function') onSubmit(payload)
        else console.log('폼 제출:', payload)
    }

    return (
        <Container>
            <FormWrapper onSubmit={handleSubmit} noValidate>
                <Fields>
                    <Field>
                        <Label>
                            오미자 무게
                            <NumberInput
                                name="omijaWeight"
                                step="0.01"
                                value={form.omijaWeight}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            쌍화차 무게
                            <NumberInput
                                name="ssanghwaWeight"
                                step="0.01"
                                value={form.ssanghwaWeight}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            수정과 무게
                            <NumberInput
                                name="sujeonggwaWeight"
                                step="0.01"
                                value={form.sujeonggwaWeight}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            호두과자 제조
                            <NumberInput
                                name="hodugwajaWeight"
                                step="0.001"
                                value={form.hodugwajaWeight}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Divider />
                    <Field>
                        <Label>
                            쌍화차[HOT]
                            <NumberInput
                                name="ssanghwaHotHall"
                                value={form.ssanghwaHotHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            수정과[HOT]
                            <NumberInput
                                name="sujeonggwaHotHall"
                                value={form.sujeonggwaHotHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            수정과[ICE]
                            <NumberInput
                                name="sujeonggwaIceHall"
                                value={form.sujeonggwaIceHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            오미자[HOT]
                            <NumberInput
                                name="omijaHotHall"
                                value={form.omijaHotHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            오미자[ICE]
                            <NumberInput
                                name="omijaIceHall"
                                value={form.omijaIceHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            커피[HOT]
                            <NumberInput
                                name="coffeeHotHall"
                                value={form.coffeeHotHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            커피[ICE]
                            <NumberInput
                                name="coffeeIceHall"
                                value={form.coffeeIceHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            금옥팥죽
                            <NumberInput
                                name="patjukHall"
                                value={form.patjukHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            단팥죽
                            <NumberInput
                                name="sweetPatjukHall"
                                value={form.sweetPatjukHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            서울빙수
                            <NumberInput
                                name="seoulHall"
                                value={form.seoulHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            호두과자
                            <NumberInput
                                name="hodugwajaHall"
                                value={form.hodugwajaHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            레몬진저빙수
                            <NumberInput
                                name="lemonHall"
                                value={form.lemonHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            쌍화차[ICE]
                            <NumberInput
                                name="ssanghwaIceHall"
                                value={form.ssanghwaIceHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            단호박 죽
                            <NumberInput
                                name="pumkinHall"
                                value={form.pumkinHall}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Divider />
                    <Field>
                        <Label>
                            쌍화차[HOT](포장)
                            <NumberInput
                                name="ssanghwaHotTakeout"
                                value={form.ssanghwaHotTakeout}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            수정과[HOT](포장)
                            <NumberInput
                                name="sujeonggwaHotTakeout"
                                value={form.sujeonggwaHotTakeout}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            수정과[ICE](포장)
                            <NumberInput
                                name="sujeonggwaIceTakeout"
                                value={form.sujeonggwaIceTakeout}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            오미자[HOT](포장)
                            <NumberInput
                                name="omijaHotTakeout"
                                value={form.omijaHotTakeout}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            오미자[ICE](포장)
                            <NumberInput
                                name="omijaIceTakeout"
                                value={form.omijaIceTakeout}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            커피[HOT] (포장)
                            <NumberInput
                                name="coffeeHotTakeout"
                                value={form.coffeeHotTakeout}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            커피[ICE] (포장)
                            <NumberInput
                                name="coffeeIceTakeout"
                                value={form.coffeeIceTakeout}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            쌍화차 병
                            <NumberInput
                                name="ssanghwabottle"
                                value={form.ssanghwabottle}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            수정과 병
                            <NumberInput
                                name="sujeonggwaBottle"
                                value={form.sujeonggwaBottle}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            오미자 병
                            <NumberInput
                                name="omijaBottle"
                                value={form.omijaBottle}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            금옥팥죽 (포장)
                            <NumberInput
                                name="patjukTakeout"
                                value={form.patjukTakeout}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            단팥죽 (포장)
                            <NumberInput
                                name="sweetPatjukTakeout"
                                value={form.sweetPatjukTakeout}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            서울빙수 (포장)
                            <NumberInput
                                name="seoulTakeout"
                                value={form.seoulTakeout}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            호두과자 (포장)
                            <NumberInput
                                name="hodugwajaTakeout"
                                value={form.hodugwajaTakeout}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            레몬진저빙수 (포장)
                            <NumberInput
                                name="lemonTakeout"
                                value={form.lemonTakeout}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            쌍화차[ICE] (포장)
                            <NumberInput
                                name="ssanghwaIceTakeout"
                                value={form.ssanghwaIceTakeout}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            금옥팥죽 파우치
                            <NumberInput
                                name="patjukPouch"
                                value={form.patjukPouch}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            단팥죽 파우치
                            <NumberInput
                                name="sweetPatjukPouch"
                                value={form.sweetPatjukPouch}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                    <Field>
                        <Label>
                            호박죽 파우치
                            <NumberInput
                                name="pumkinPouch"
                                value={form.pumkinPouch}
                                onChange={handleChange}
                            />
                        </Label>
                    </Field>
                </Fields>
            </FormWrapper>
            <Preview>
                <PreviewTitle>제출 결과 (오른쪽)</PreviewTitle>
                {submitted ? (
                    <>
                        <Pre>{submitted}</Pre>
                    </>
                ) : (
                    <SubmittedTime style={{ color: vars.muted }}>
                        아직 제출된 데이터가 없습니다.
                    </SubmittedTime>
                )}
            </Preview>

            <FixedSubmit type="button" onClick={handleSubmit}>
                제출
            </FixedSubmit>
        </Container>
    )
}
