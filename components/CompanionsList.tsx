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
                                <div className="flex items-center gap-2">
                                    <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" >
                                        <Image
                                         src={`/icons/${subject}.svg`}
                                         alt={subject}
                                         width={35}
                                         height={35} />
                                    </div>
                                    <div>
                                        <p className="font-medium">{name}</p>
                                        <p className="text-sm text-gray-500">{topic}</p>
                                    </div>
                                </div>
                                </Link>
                            </TableCell>
                            <TableCell className="capitalize">{subject}</TableCell>
                            <TableCell className="text-right">{duration} min</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
       </article>
    );
}

export default CompanionsList