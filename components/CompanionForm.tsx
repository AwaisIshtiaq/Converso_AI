"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
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
import { CreateCompanion } from "@/lib/actions/companion.actions"

const subjects = ["Science", "Math", "Language", "Coding", "History", "Economics"]
const voices = ["Male", "Female"]
const styles = ["Formal", "Casual"]

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
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const router = useRouter()

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

  const onSubmit = async (data: FormData) => {
    setErrors({})

    const newErrors: Record<string, string> = {}
    if (!data.name || data.name.trim() === "") {
      newErrors.name = "Companion name is required"
    }
    if (!data.subject || data.subject.trim() === "") {
      newErrors.subject = "Please select a subject"
    }
    if (!data.topic || data.topic.trim() === "") {
      newErrors.topic = "Please enter a topic"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const companion = await CreateCompanion({
        name: data.name,
        subject: data.subject,
        topic: data.topic,
        voice: data.voice || "Male",
        style: data.style || "Casual",
        duration: data.duration,
      })

      if (companion?.id) {
        toast.success("Companion Created!", {
          description: `${data.name} is ready.`,
        })
        router.push(`/companions/${companion.id}`)
      }
    } catch (error) {
      console.error("Create companion error:", error)
    } finally {
      setIsSubmitting(false)
    }
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
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="form-companion-name">
                Companion Name
              </FieldLabel>
              <Input
                id="form-companion-name"
                placeholder="Neura the Brainy Explorer"
                autoComplete="off"
                {...form.register("name")}
              />
              {errors.name && (
                <FieldError errors={[errors.name]} />
              )}
            </Field>

            <Field data-invalid={!!errors.subject}>
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
              {errors.subject && (
                <FieldError errors={[errors.subject]} />
              )}
            </Field>

            <Field data-invalid={!!errors.topic}>
              <FieldLabel htmlFor="form-companion-topic">
                Topic
              </FieldLabel>
              <Input
                id="form-companion-topic"
                placeholder="Neural Networks of the Brain"
                autoComplete="off"
                {...form.register("topic")}
              />
              {errors.topic && (
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
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset()
              setErrors({})
            }}
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button type="submit" form="form-companion" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Companion"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
