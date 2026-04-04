"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const subjects = ["Science", "Math", "Language", "Coding", "History", "Economics"]
const voices = ["Male - Casual", "Male - Formal", "Female - Casual", "Female - Formal"]
const styles = ["Friendly", "Professional", "Playful", "Strict"]

interface FormData {
  name: string
  subject: string
  topic: string
  voice: string
  style: string
  duration: number
}

export function CompanionForm() {
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [showErrors, setShowErrors] = React.useState(false)
  
  const form = useForm<FormData>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  })

  function validateForm(data: FormData): boolean {
    const newErrors: Record<string, string> = {}
    
    if (!data.name || data.name.trim() === "") {
      newErrors.name = "Companion is Required"
    }
    if (!data.subject || data.subject.trim() === "") {
      newErrors.subject = "Subject is Required"
    }
    if (!data.topic || data.topic.trim() === "") {
      newErrors.topic = "Topic is Required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function onSubmit(data: FormData) {
    if (!validateForm(data)) {
      setShowErrors(true)
      return
    }
    
    toast("Companion Created!", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Companion Builder</CardTitle>
        <CardDescription>
          Create your AI teaching companion.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-companion" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field data-invalid={showErrors && !!errors.name}>
              <FieldLabel htmlFor="form-companion-name">
                Companion Name
              </FieldLabel>
              <Input
                id="form-companion-name"
                placeholder="Neura the Brainy Explorer"
                autoComplete="off"
                {...form.register("name")}
              />
              {showErrors && errors.name && (
                <FieldError errors={[errors.name]} />
              )}
            </Field>

            <Field data-invalid={showErrors && !!errors.subject}>
              <FieldLabel htmlFor="form-companion-subject">
                Subject
              </FieldLabel>
              <select
                id="form-companion-subject"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                {...form.register("subject")}
              >
                <option value="">Select subject</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {showErrors && errors.subject && (
                <FieldError errors={[errors.subject]} />
              )}
            </Field>

            <Field data-invalid={showErrors && !!errors.topic}>
              <FieldLabel htmlFor="form-companion-topic">
                Topic
              </FieldLabel>
              <Input
                id="form-companion-topic"
                placeholder="Neural Networks of the Brain"
                autoComplete="off"
                {...form.register("topic")}
              />
              {showErrors && errors.topic && (
                <FieldError errors={[errors.topic]} />
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="form-companion-voice">
                Voice
              </FieldLabel>
              <select
                id="form-companion-voice"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                {...form.register("voice")}
              >
                <option value="">Select voice</option>
                {voices.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </Field>

            <Field>
              <FieldLabel htmlFor="form-companion-style">
                Style
              </FieldLabel>
              <select
                id="form-companion-style"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                {...form.register("style")}
              >
                <option value="">Select style</option>
                {styles.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            <Field>
              <FieldLabel htmlFor="form-companion-duration">
                Duration (minutes)
              </FieldLabel>
              <Input
                type="number"
                id="form-companion-duration"
                placeholder="15"
                {...form.register("duration", { valueAsNumber: true })}
              />
              <FieldDescription>
                Set the lesson duration in minutes.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => { form.reset(); setShowErrors(false); }}>
            Reset
          </Button>
          <Button type="submit" form="form-companion">
            Create Companion
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
