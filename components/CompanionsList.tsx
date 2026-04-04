import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { subjectsColors } from "@/constants";

interface Companion {
  id: string;
  name: string;
  subject: string;
  topic: string;
  duration: number;
}

interface CompanionListProps {
    title: string;
    companions?: Companion[];
    className?: string;
}

const CompanionsList = ({title, companions, className}: CompanionListProps) => {
    return(
       <article className={cn('companion-list', className)}>
            <h2 className="font-bold text-3xl">{title}</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg">Lessons</TableHead>
                        <TableHead className="text-lg">Subject</TableHead>
                        <TableHead className="text-lg text-right">Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions?.map(({id, subject, name, topic, duration}) => (
                        <TableRow key={id}>
                            <TableCell>
                                <Link href={`/companions/${id}`}>
                                <div className="flex items-center gap-3">
                                    <div 
                                        className="size-14 flex items-center justify-center rounded-xl max-md:hidden"
                                        style={{ backgroundColor: subjectsColors[subject as keyof typeof subjectsColors] || '#E5D0FF' }}
                                    >
                                        <Image
                                         src={`/icons/${subject}.svg`}
                                         alt={subject}
                                         width={28}
                                         height={28} />
                                    </div>
                                    <div>
                                        <p className="font-medium">{name}</p>
                                        <p className="text-sm text-gray-500">{topic}</p>
                                    </div>
                                </div>
                                </Link>
                            </TableCell>
                            <TableCell className="capitalize"><span className="bg-black text-white rounded-4xl text-sm px-2 py-1 capitalize">{subject}</span></TableCell>
                            <TableCell className="text-right">{duration} min</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
       </article>
    );
}

export default CompanionsList