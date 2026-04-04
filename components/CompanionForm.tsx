"use client"

import { zodResolver } from "@/lib/zod-resolver"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(1, { message: "Companion is Required" }),
  subject: z.string().min(1, { message: "Subject is Required" }),
  topic: z.string().min(1, { message: "Topic is Required" }),
  voice: z.string().min(1, { message: "Voice is Required" }),
  style: z.string().min(1, { message: "Style is Required" }),
  duration: z.coerce.number().min(1, { message: "Duration is Required" }),
})

const subjects = ["Science", "Math", "Language", "Coding", "History", "Economics"]
const voices = ["Male - Casual", "Male - Formal", "Female - Casual", "Female - Formal"]
const styles = ["Friendly", "Professional", "Playful", "Strict"]

const CompanionForm = () => {
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
    toast.success("Companion Created!", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-slate-950 p-4 text-slate-50">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Companion Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter companion name" {...field} className="input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <select {...field} className="input w-full p-2 rounded border">
                  <option value="">Select subject</option>
                  {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <Input placeholder="Enter topic" {...field} className="input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice</FormLabel>
              <FormControl>
                <select {...field} className="input w-full p-2 rounded border">
                  <option value="">Select voice</option>
                  {voices.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Style</FormLabel>
              <FormControl>
                <select {...field} className="input w-full p-2 rounded border">
                  <option value="">Select style</option>
                  {styles.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (minutes)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="15" {...field} className="input"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Create Companion</Button>
      </form>
    </Form>
  )
}

export default CompanionForm
