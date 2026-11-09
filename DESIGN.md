---
name: Personal Spotlight
description: ระบบภาพปัจจุบันของพอร์ต Siraphop Sangkrit
colors:
  action-blue: "oklch(54.6% 0.245 262.881)"
  action-blue-hover: "oklch(48.8% 0.243 264.376)"
  link-blue: "oklch(70.7% 0.165 254.624)"
  name-indigo: "oklch(58.5% 0.233 277.117)"
  name-purple: "oklch(62.7% 0.265 303.9)"
  name-pink: "oklch(65.6% 0.241 354.308)"
  slate-top: "oklch(37.2% 0.044 257.287)"
  slate-bottom: "oklch(20.8% 0.042 265.755)"
  panel: "oklch(27.8% 0.033 256.848)"
  project-panel: "oklch(37.3% 0.034 259.733)"
  border: "oklch(44.6% 0.03 256.802)"
  text-secondary: "oklch(87.2% 0.01 258.338)"
  text-muted: "oklch(70.7% 0.022 261.325)"
  text-primary: "#ffffff"
typography:
  display:
    fontFamily: "var(--font-sans)"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1
  headline:
    fontFamily: "var(--font-sans)"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.111111
  title:
    fontFamily: "var(--font-sans)"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.428571
rounded:
  tag: "4px"
  control: "6px"
  panel: "8px"
  portrait: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  field: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  grid: "48px"
  heading-gap: "64px"
  section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.panel}"
    padding: "24px 32px"
  button-primary-hover:
    backgroundColor: "{colors.action-blue-hover}"
  button-secondary:
    textColor: "{colors.text-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.panel}"
    padding: "24px 32px"
  project-card:
    backgroundColor: "{colors.project-panel}"
    rounded: "{rounded.panel}"
  skill-card:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.panel}"
    padding: "24px"
  input:
    backgroundColor: "{colors.project-panel}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.panel}"
    padding: "12px"
---

# Design System: Personal Spotlight

## Overview

**Creative North Star: "Personal Spotlight"**

แนวคิดที่เจ้าของเลือกคือการให้ตัวตนและผลงานเป็นจุดสนใจ เอกสารนี้บันทึกระบบภาพจากโค้ดปัจจุบัน เพื่อใช้เป็นฐานของการปรับแต่งและ Live ไม่ได้อนุมัติการออกแบบใหม่ทั้งเว็บไซต์

ระบบปัจจุบันใช้พื้นหลังสีเข้ม ตัวอักษรสว่าง ปุ่มน้ำเงิน และชื่อที่ไล่สีคราม ม่วง และชมพู กลุ่มเนื้อหาอยู่ในกรอบกว้างคงที่และแบ่งเป็นส่วนแนวตั้ง มีการ์ดขอบมนสำหรับผลงาน ทักษะ และประสบการณ์ ลักษณะเหล่านี้เป็นข้อสังเกตจาก implementation ไม่ใช่ข้อกำหนดใหม่ที่เจ้าของต้องรักษาตลอดไป

**Key Characteristics:**

- ตัวตนและผลงานเป็นจุดสนใจ
- พื้นหลังเข้มและข้อความสว่าง
- น้ำเงินสำหรับการกระทำและลิงก์
- กลุ่มเนื้อหาที่มีระยะห่างชัดเจนและการ์ดขอบมน

แหล่งอ้างอิงคือ `src/app/layout.tsx`, `src/app/globals.css`, `src/app/components/`, `src/app/admin/page.tsx` และค่าเริ่มต้น Tailwind ที่ติดตั้งอยู่ ยังไม่ได้ตรวจ computed styles ในเบราว์เซอร์ ข้อกำหนดตำแหน่ง Software Developer และภาษาไทยก่อนภาษาอังกฤษอยู่ใน `PRODUCT.md`

## Colors

ใช้สีเย็นเข้มเป็นพื้นผิว สีสว่างสำหรับเนื้อหา และสีอิ่มตัวสำหรับจุดที่ต้องการความสนใจ ค่ามาตรฐานอยู่ใน frontmatter และตรงกับค่า OKLCH ของ Tailwind ที่โค้ดเรียกใช้

### Primary

- **Action Blue** (`action-blue`): พื้นหลังปุ่มหลัก โดยใช้ `action-blue-hover` เมื่อชี้เมาส์
- **Link Blue** (`link-blue`): สีลิงก์และสถานะชี้เมาส์บนพื้นหลังเข้ม

### Secondary

- **Name Indigo**, **Name Purple**, **Name Pink**: สีไล่ระดับที่ชื่อในส่วนแนะนำตัวและแถบนำทาง ใช้บันทึกลักษณะเดิม ไม่ใช่คำสั่งให้เพิ่มข้อความไล่สีในส่วนอื่น

### Neutral

- **Slate Top / Slate Bottom**: จุดต้นและปลายของพื้นหลังไล่สีแนวตั้ง
- **Panel**: พื้นหลังการ์ดทักษะ ประสบการณ์ และแผงจัดการ
- **Project Panel**: พื้นหลังการ์ดผลงานและช่องกรอกในโหมดมืด
- **Border**: เส้นขอบช่องกรอกและปุ่มรองในโหมดมืด
- **Text Primary / Secondary / Muted**: ลำดับความเด่นของข้อความ

## Typography

**Display / Body Font:** สืบทอด `--font-sans` ของ Tailwind เป็น system sans stack ตาม CSS ปัจจุบัน

**Loaded Fonts:** layout โหลด Geist และ Geist Mono ผ่าน Next.js และประกาศตัวแปรไว้ ส่วน `tailwind.config.ts` ระบุให้ใช้ตัวแปรเหล่านี้ แต่ stylesheet ของ Tailwind v4 ยังไม่มี `@config` หรือการผูก `--font-sans` เข้ากับ Geist โดยตรง จึงยังไม่ถือว่า Geist ถูกใช้เป็นฟอนต์จริงจนกว่าจะตรวจในเบราว์เซอร์ ไม่มีฟอนต์ไทยเฉพาะที่กำหนดไว้ในโค้ดปัจจุบัน

### Hierarchy

- **Display:** ชื่อหลักขนาด 36px บนจอเล็ก และขนาดตาม `display` ตั้งแต่ breakpoint กลางขึ้นไป
- **Headline:** หัวข้อส่วนเริ่มที่ 30px และใช้ขนาดตาม `headline` บนจอกลางขึ้นไป
- **Title:** ชื่อการ์ด โดยหัวข้อย่อยบางจุดใช้ 24px
- **Body:** เนื้อหาทั่วไปใช้ขนาดตาม `body`; คำอธิบายการ์ดบางจุดใช้ 14px และคำเกริ่นส่วนใช้ 18px
- **Label:** ข้อความปุ่มใช้ขนาดตาม `label`; แท็กเทคโนโลยีใช้ 12px

## Layout

เนื้อหาส่วนใหญ่กว้างไม่เกิน 1152px และจัดกึ่งกลาง ส่วนแนะนำตัวกว้างไม่เกิน 896px ระยะขอบแนวนอนเริ่มที่ 16px ส่วนเนื้อหาใช้ระยะบนและล่าง 80px และเว้นระยะหลังกลุ่มหัวข้อ 64px

ผลงานแสดงหนึ่งคอลัมน์บนมือถือ สองคอลัมน์ตั้งแต่ 768px และสามคอลัมน์ตั้งแต่ 1024px ทักษะเป็นสามคอลัมน์ตั้งแต่ 768px ส่วนเกี่ยวกับตัวใช้สองคอลัมน์ที่ breakpoint เดียวกัน ช่องว่างกริดทั่วไป 32px และส่วนเกี่ยวกับตัวใช้ 48px ปุ่มในส่วนแนะนำตัวเรียงแนวตั้งก่อนเปลี่ยนเป็นแนวนอนที่ 640px

แถบนำทางตรึงด้านบน สูง 64px และพื้นหลังโปร่งใส เมนูเดสก์ท็อปเริ่มที่ 768px; จอเล็กใช้ปุ่มเปิดเมนู

## Elevation & Depth

ระบบปัจจุบันใช้ความต่างของสีพื้นผิวร่วมกับเงานุ่ม การ์ดผลงาน ทักษะ และประสบการณ์ใช้เงาระดับใหญ่ของ Tailwind แผง admin ใช้เงามาตรฐาน โดยค่าที่สกัดไว้เก็บใน `.impeccable/design.json` ไม่มีข้อกำหนดจากเจ้าของให้เปลี่ยนเป็นระบบแบนหรือเพิ่มเงา

พื้นหลังมีเส้น SVG เคลื่อนไหว ส่วนปุ่มจาก Animate UI ขยายเมื่อชี้เมาส์และย่อลงเมื่อกด เป็นพฤติกรรมที่มีอยู่ ไม่ใช่คำสั่งให้กระจายเอฟเฟกต์นี้ไปทุกองค์ประกอบ

## Shapes

การ์ด ช่องกรอก และปุ่มที่ใช้จริงในหน้าพอร์ตมีมุมโค้ง 8px ปุ่มพื้นฐานในไลบรารีมีมุมโค้ง 6px แท็กเทคโนโลยีมีมุมโค้ง 4px รูปโปรไฟล์ถูกครอบเป็นวงกลม การ์ดผลงานครอบภาพให้อยู่ในกรอบและใช้ภาพเต็มพื้นที่แบบ cover

## Components

### Buttons

ปุ่มหลักพื้นน้ำเงินและข้อความขาว ปุ่มรองใช้ข้อความสีอ่อนและเส้นขอบสีเทาในโหมดมืด ขนาดและระยะอยู่ใน frontmatter ปุ่มหลักใช้สีน้ำเงินเข้มขึ้นเมื่อชี้เมาส์ ส่วนปุ่มรองใช้พื้นหลังสี Panel ปุ่ม Animate UI ใช้สเกล 1.05 เมื่อชี้เมาส์และ 0.95 เมื่อกด

ตัวแปร semantic เช่น `primary` และ `ring` ถูกอ้างในปุ่มไลบรารี แต่ยังไม่มีนิยามใน global stylesheet จึงยึดสีที่หน้าใช้งานระบุโดยตรงเป็นหลัก และยังไม่รับรอง focus treatment ของปุ่มเหล่านี้

### Chips

แท็กเทคโนโลยีใช้ข้อความ 12px พื้นผิวสีเทา ขอบมนเล็ก และระยะภายในแนวตั้ง 4px แนวนอน 8px เป็นข้อมูลประกอบ ไม่ใช่ตัวกรองที่คลิกได้

### Cards / Containers

การ์ดผลงานใช้พื้นสี Project Panel ภาพด้านบนสูง 192px และเนื้อหาภายในมีระยะ 24px การ์ดทักษะและประสบการณ์ใช้พื้นสี Panel และเงานุ่มตาม Elevation & Depth

### Inputs / Fields

ช่องกรอกใน admin มีเส้นขอบ 1px พื้นสี Project Panel ระยะภายใน 12px และขอบมน 8px ฟอร์มแก้ไขเนื้อหาบางส่วนใช้เส้นขอบและวงแหวนสีน้ำเงินเมื่อ focus แต่ยังไม่ได้กำหนดรูปแบบนี้สม่ำเสมอทุกฟอร์ม ปุ่มบันทึกบางจุดลดความทึบและแสดงสถานะปิดการใช้งานขณะบันทึก

### Navigation

ชื่อเจ้าของเป็นปุ่มกลับไปส่วนต้น สีไล่ระดับตรงกับชื่อในส่วนแนะนำตัว เมนูใช้ข้อความหนา สีอ่อน และเปลี่ยนเป็นน้ำเงินเมื่อชี้เมาส์ เมนูมือถือเป็นแผงพื้นเข้มแสดงใต้แถบนำทางเมื่อเปิด การนำทางเลื่อนไปยัง section ภายในหน้า

## Do's and Don'ts

### Do:

- **Do** ใช้สี ระยะ และส่วนประกอบที่มีอยู่เป็นฐานเมื่อปรับแต่งแบบรักษาเอกลักษณ์เดิม
- **Do** ใช้ชื่อแนวคิด Personal Spotlight ตามที่เจ้าของเลือก
- **Do** รองรับข้อความไทยเป็นหลักและอังกฤษเป็นรองตาม PRODUCT.md โดยตรวจการตัดบรรทัดด้วยเนื้อหาจริง

### Don't:

- **Don't** ถือว่าชื่อแนวคิดนี้อนุมัติการเปลี่ยนดีไซน์ทั้งเว็บไซต์
- **Don't** อ้างว่าฟอนต์ที่โหลดถูกใช้จริง หรือว่าผ่านการตรวจ accessibility แล้ว โดยยังไม่มีหลักฐานจากการแสดงผล
- **Don't** เพิ่มข้อกำหนดสี ฟอนต์ เอฟเฟกต์ หรือคำอธิบายบุคลิกแบรนด์ที่เจ้าของยังไม่ได้กำหนด
