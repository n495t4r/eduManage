import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, Filter, Plus, Search, Users } from "lucide-react";
import { Img } from "react-image";
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { BreadcrumbItem } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: '/courses',
    },
];

export default function CoursesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        image: "",
        students: 0,
        duration: "",
        lessons: 0,
        instructor: "",
        department: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
    };

    const handleSubmit = () => {
        // Handle course creation logic here
        console.log(newCourse);
        setIsModalOpen(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Courses" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="container mx-auto py-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold">Courses</h1>
                        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
                            <Plus className="h-4 w-4" />
                            Add Course
                        </Button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search courses..." className="pl-8" />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                    </div>

                    <Tabs defaultValue="all" className="mb-6">
                        <TabsList>
                            <TabsTrigger value="all">All Courses</TabsTrigger>
                            <TabsTrigger value="active">Active</TabsTrigger>
                            <TabsTrigger value="archived">Archived</TabsTrigger>
                            <TabsTrigger value="drafts">Drafts</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <Link href={`/courses/${course.id}`} key={course.id}>
                                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="aspect-video relative">
                                        <Img src={course.image || "/placeholder.svg"} alt={course.title} className="object-cover" />
                                    </div>
                                    <CardHeader>
                                        <CardTitle>{course.title}</CardTitle>
                                        <CardDescription>{course.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                <span>{course.students} students</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span>{course.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <BookOpen className="h-4 w-4" />
                                                <span>{course.lessons} lessons</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="border-t px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-primary text-white grid place-items-center">
                                                {course.instructor
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </div>
                                            <div className="text-sm">
                                                <p className="font-medium">{course.instructor}</p>
                                                <p className="text-muted-foreground">{course.department}</p>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Course</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <Input name="title" placeholder="Course Title" value={newCourse.title} onChange={handleInputChange} />
                        <Input name="description" placeholder="Course Description" value={newCourse.description} onChange={handleInputChange} />
                        <Input name="image" placeholder="Course Image URL" value={newCourse.image} onChange={handleInputChange} />
                        <Input name="students" placeholder="Number of Students" type="number" value={newCourse.students} onChange={handleInputChange} />
                        <Input name="duration" placeholder="Course Duration" value={newCourse.duration} onChange={handleInputChange} />
                        <Input name="lessons" placeholder="Number of Lessons" type="number" value={newCourse.lessons} onChange={handleInputChange} />
                        <Input name="instructor" placeholder="Instructor Name" value={newCourse.instructor} onChange={handleInputChange} />
                        <Input name="department" placeholder="Department" value={newCourse.department} onChange={handleInputChange} />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubmit}>Add Course</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

const courses = [
    {
        id: "1",
        title: "Introduction to Mathematics",
        description: "Fundamental concepts of mathematics for beginners",
        image: "/placeholder.svg?height=200&width=400",
        students: 156,
        duration: "12 weeks",
        lessons: 24,
        instructor: "John Smith",
        department: "Mathematics",
    },
    {
        id: "2",
        title: "Advanced Physics",
        description: "Explore complex physics theories and applications",
        image: "/placeholder.svg?height=200&width=400",
        students: 89,
        duration: "16 weeks",
        lessons: 32,
        instructor: "Maria Johnson",
        department: "Physics",
    },
    {
        id: "3",
        title: "Introduction to Computer Science",
        description: "Learn the basics of programming and computer systems",
        image: "/placeholder.svg?height=200&width=400",
        students: 210,
        duration: "10 weeks",
        lessons: 20,
        instructor: "David Lee",
        department: "Computer Science",
    },
    {
        id: "4",
        title: "World History",
        description: "Comprehensive overview of major historical events",
        image: "/placeholder.svg?height=200&width=400",
        students: 124,
        duration: "14 weeks",
        lessons: 28,
        instructor: "Sarah Williams",
        department: "History",
    },
    {
        id: "5",
        title: "English Literature",
        description: "Analysis of classic and contemporary literary works",
        image: "/placeholder.svg?height=200&width=400",
        students: 98,
        duration: "12 weeks",
        lessons: 24,
        instructor: "Robert Brown",
        department: "English",
    },
    {
        id: "6",
        title: "Biology Fundamentals",
        description: "Introduction to living organisms and biological systems",
        image: "/placeholder.svg?height=200&width=400",
        students: 145,
        duration: "15 weeks",
        lessons: 30,
        instructor: "Jennifer Davis",
        department: "Biology",
    },
];