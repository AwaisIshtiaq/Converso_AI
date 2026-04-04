"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
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

const formSchema = z.object({
  name: z.string().min(1, "Companion is Required"),
  subject: z.string().min(1, "Subject is Required"),
  topic: z.string().min(1, "Topic is Required"),
  voice: z.string().optional(),
  style: z.string().optional(),
  duration: z.coerce.number().optional(),
})

const subjects = ["Science", "Math", "Language", "Coding", "History", "Economics"]
const voices = ["Male - Casual", "Male - Formal", "Female - Casual", "Female - Formal"]
const styles = ["Friendly", "Professional", "Playful", "Strict"]

export function CompanionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  function onSubmit(data: z.infer<typeof formSchema>) {
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
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-companion-name">
                    Companion Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-companion-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Neura the Brainy Explorer"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-companion-subject">
                    Subject
                  </FieldLabel>
                  <select
                    {...field}
                    id="form-companion-subject"
                    aria-invalid={fieldState.invalid}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select subject</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="topic"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-companion-topic">
                    Topic
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-companion-topic"
                    aria-invalid={fieldState.invalid}
                    placeholder="Neural Networks of the Brain"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="voice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-companion-voice">
                    Voice
                  </FieldLabel>
                  <select
                    {...field}
                    id="form-companion-voice"
                    aria-invalid={fieldState.invalid}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select voice</option>
                    {voices.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="style"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-companion-style">
                    Style
                  </FieldLabel>
                  <select
                    {...field}
                    id="form-companion-style"
                    aria-invalid={fieldState.invalid}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select style</option>
                    {styles.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="duration"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-companion-duration">
                    Duration (minutes)
                  </FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="form-companion-duration"
                    aria-invalid={fieldState.invalid}
                    placeholder="15"
                  />
                  <FieldDescription>
                    Set the lesson duration in minutes.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
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