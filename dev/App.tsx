import React, { useState } from "react";
import { Moon, Sun, Github, Package, Home, Settings, Users, BarChart, FileText, LogOut, ChevronRight, Upload } from "lucide-react";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Switch,
  Checkbox,
  Progress,
  Slider,
  Separator,
  Skeleton,
  // New components
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  Heading,
  Text,
  Code,
  Blockquote,
  List,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Label,
  FormField,
  FileUpload,
  FilePreview,
} from "../src";

type ComponentKey =
  | "button"
  | "card"
  | "input"
  | "textarea"
  | "badge"
  | "avatar"
  | "switch"
  | "checkbox"
  | "progress"
  | "slider"
  | "separator"
  | "skeleton"
  | "sidebar"
  | "typography"
  | "table"
  | "radio"
  | "select"
  | "form"
  | "file-upload";

const components: { key: ComponentKey; name: string; category: string }[] = [
  // Core
  { key: "button", name: "Button", category: "Core" },
  { key: "card", name: "Card", category: "Core" },
  { key: "input", name: "Input", category: "Core" },
  { key: "textarea", name: "Textarea", category: "Core" },
  // Form
  { key: "form", name: "Form Field", category: "Form" },
  { key: "select", name: "Select", category: "Form" },
  { key: "radio", name: "Radio Group", category: "Form" },
  { key: "checkbox", name: "Checkbox", category: "Form" },
  { key: "switch", name: "Switch", category: "Form" },
  { key: "file-upload", name: "File Upload", category: "Form" },
  // Data Display
  { key: "badge", name: "Badge", category: "Data" },
  { key: "avatar", name: "Avatar", category: "Data" },
  { key: "table", name: "Table", category: "Data" },
  { key: "progress", name: "Progress", category: "Data" },
  { key: "slider", name: "Slider", category: "Data" },
  // Layout
  { key: "sidebar", name: "Sidebar", category: "Layout" },
  { key: "separator", name: "Separator", category: "Layout" },
  { key: "typography", name: "Typography", category: "Layout" },
  // Feedback
  { key: "skeleton", name: "Skeleton", category: "Feedback" },
];

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeComponent, setActiveComponent] = useState<ComponentKey>("button");

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${isDark ? "dark" : ""}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background">
        <div className="container mx-auto px-6 py-4">
          <Card variant="flat" className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-[-3px_-3px_6px_hsl(var(--shadow-light)),3px_3px_6px_hsl(var(--shadow-dark))]">
                  <Package className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Gisketch Neumorphism</h1>
                  <p className="text-xs text-muted-foreground">Neumorphic Component Library</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="flat" size="icon" onClick={toggleTheme}>
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button variant="flat" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 shrink-0">
            <Card variant="flat" className="sticky top-32 p-4">
              <h2 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
                Components
              </h2>
              <nav className="space-y-4">
                {["Core", "Form", "Data", "Layout", "Feedback"].map((category) => (
                  <div key={category}>
                    <div className="text-xs font-medium text-muted-foreground mb-2 px-4">{category}</div>
                    <div className="space-y-1">
                      {components
                        .filter((c) => c.category === category)
                        .map((comp) => (
                          <button
                            key={comp.key}
                            onClick={() => setActiveComponent(comp.key)}
                            className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                              activeComponent === comp.key
                                ? "bg-background shadow-[inset_-3px_-3px_6px_hsl(var(--shadow-light)),inset_3px_3px_6px_hsl(var(--shadow-dark))] text-primary font-medium"
                                : "hover:bg-muted/50"
                            }`}
                          >
                            {comp.name}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </nav>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <ComponentShowcase activeComponent={activeComponent} />
          </main>
        </div>
      </div>
    </div>
  );
}

function ComponentShowcase({ activeComponent }: { activeComponent: ComponentKey }) {
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);
  const [radioValue, setRadioValue] = useState("option1");
  const [selectValue, setSelectValue] = useState("");

  const renderComponent = () => {
    switch (activeComponent) {
      case "button":
        return <ButtonShowcase />;
      case "card":
        return <CardShowcase />;
      case "input":
        return <InputShowcase />;
      case "textarea":
        return <TextareaShowcase />;
      case "badge":
        return <BadgeShowcase />;
      case "avatar":
        return <AvatarShowcase />;
      case "switch":
        return (
          <SwitchShowcase
            checked={switchChecked}
            onCheckedChange={setSwitchChecked}
          />
        );
      case "checkbox":
        return (
          <CheckboxShowcase
            checked={checkboxChecked}
            onCheckedChange={setCheckboxChecked}
          />
        );
      case "progress":
        return <ProgressShowcase />;
      case "slider":
        return (
          <SliderShowcase value={sliderValue} onValueChange={setSliderValue} />
        );
      case "separator":
        return <SeparatorShowcase />;
      case "skeleton":
        return <SkeletonShowcase />;
      case "sidebar":
        return <SidebarShowcase />;
      case "typography":
        return <TypographyShowcase />;
      case "table":
        return <TableShowcase />;
      case "radio":
        return <RadioShowcase value={radioValue} onValueChange={setRadioValue} />;
      case "select":
        return <SelectShowcase value={selectValue} onValueChange={setSelectValue} />;
      case "form":
        return <FormShowcase />;
      case "file-upload":
        return <FileUploadShowcase />;
      default:
        return null;
    }
  };

  return (
    <Card variant="flat" className="p-8">
      {renderComponent()}
    </Card>
  );
}

function ShowcaseSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
}

function VariantSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        {title}
      </h3>
      <div className="flex flex-wrap gap-4 items-center">{children}</div>
    </div>
  );
}

function ButtonShowcase() {
  return (
    <ShowcaseSection
      title="Button"
      description="Interactive button components with neumorphic styling. Perfect for actions and CTAs."
    >
      <div className="space-y-8">
        <VariantSection title="Variants">
          <Button variant="default">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </VariantSection>

        <VariantSection title="Neumorphic Styles">
          <Button variant="flat">Flat</Button>
          <Button variant="pressed">Pressed</Button>
        </VariantSection>

        <VariantSection title="Sizes">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </VariantSection>

        <VariantSection title="Icon Buttons">
          <Button variant="flat" size="icon-sm">
            <Sun className="h-4 w-4" />
          </Button>
          <Button variant="flat" size="icon">
            <Moon className="h-4 w-4" />
          </Button>
          <Button variant="flat" size="icon-lg">
            <Github className="h-5 w-5" />
          </Button>
        </VariantSection>

        <VariantSection title="States">
          <Button disabled>Disabled</Button>
          <Button variant="primary" disabled>
            Disabled Primary
          </Button>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function CardShowcase() {
  return (
    <ShowcaseSection
      title="Card"
      description="Container components with neumorphic depth effects. Use for grouping content."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="flat">
          <CardHeader>
            <CardTitle>Flat Card</CardTitle>
            <CardDescription>Extruded from the surface</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This card appears to be raised above the surface with soft shadows.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="primary" size="sm">
              Action
            </Button>
          </CardFooter>
        </Card>

        <Card variant="pressed">
          <CardHeader>
            <CardTitle>Pressed Card</CardTitle>
            <CardDescription>Recessed into the surface</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This card appears to be pressed into the background.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="flat" size="sm">
              Action
            </Button>
          </CardFooter>
        </Card>

        <Card variant="convex">
          <CardHeader>
            <CardTitle>Convex Card</CardTitle>
            <CardDescription>With gradient highlight</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This card has a subtle gradient that enhances the 3D effect.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="flat" size="sm">
              Action
            </Button>
          </CardFooter>
        </Card>

        <Card variant="interactive">
          <CardHeader>
            <CardTitle>Interactive Card</CardTitle>
            <CardDescription>Click me!</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This card responds to hover and click interactions.
            </p>
          </CardContent>
          <CardFooter>
            <Badge variant="primary">Clickable</Badge>
          </CardFooter>
        </Card>
      </div>
    </ShowcaseSection>
  );
}

function InputShowcase() {
  return (
    <ShowcaseSection
      title="Input"
      description="Text input fields with neumorphic inset shadow effects."
    >
      <div className="space-y-8 max-w-md">
        <VariantSection title="Variants">
          <div className="w-full space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Default (Pressed)</label>
              <Input placeholder="Enter text..." variant="default" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Flat</label>
              <Input placeholder="Enter text..." variant="flat" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Minimal</label>
              <Input placeholder="Enter text..." variant="minimal" />
            </div>
          </div>
        </VariantSection>

        <VariantSection title="Sizes">
          <div className="w-full space-y-4">
            <Input placeholder="Small input" inputSize="sm" />
            <Input placeholder="Default input" inputSize="default" />
            <Input placeholder="Large input" inputSize="lg" />
          </div>
        </VariantSection>

        <VariantSection title="Types">
          <div className="w-full space-y-4">
            <Input type="email" placeholder="Email address" />
            <Input type="password" placeholder="Password" />
            <Input type="number" placeholder="Number" />
          </div>
        </VariantSection>

        <VariantSection title="States">
          <div className="w-full space-y-4">
            <Input placeholder="Disabled input" disabled />
          </div>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function TextareaShowcase() {
  return (
    <ShowcaseSection
      title="Textarea"
      description="Multi-line text input with neumorphic styling."
    >
      <div className="space-y-8 max-w-md">
        <VariantSection title="Variants">
          <div className="w-full space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Default</label>
              <Textarea placeholder="Enter your message..." variant="default" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Flat</label>
              <Textarea placeholder="Enter your message..." variant="flat" />
            </div>
          </div>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function BadgeShowcase() {
  return (
    <ShowcaseSection
      title="Badge"
      description="Small status indicators and labels with neumorphic effects."
    >
      <div className="space-y-8">
        <VariantSection title="Variants">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="pressed">Pressed</Badge>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function AvatarShowcase() {
  return (
    <ShowcaseSection
      title="Avatar"
      description="User profile images with neumorphic container effects."
    >
      <div className="space-y-8">
        <VariantSection title="Variants">
          <Avatar variant="flat">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar variant="pressed">
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar variant="ring">
            <AvatarFallback>CD</AvatarFallback>
          </Avatar>
        </VariantSection>

        <VariantSection title="Sizes">
          <Avatar size="sm" variant="flat">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar size="default" variant="flat">
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar size="lg" variant="flat">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <Avatar size="xl" variant="flat">
            <AvatarFallback>XL</AvatarFallback>
          </Avatar>
        </VariantSection>

        <VariantSection title="With Image">
          <Avatar variant="flat" size="lg">
            <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="User" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar variant="ring" size="lg">
            <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="User" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function SwitchShowcase({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <ShowcaseSection
      title="Switch"
      description="Toggle switches for boolean settings with neumorphic track and thumb."
    >
      <div className="space-y-8">
        <VariantSection title="Default">
          <div className="flex items-center gap-3">
            <Switch checked={checked} onCheckedChange={onCheckedChange} />
            <span className="text-sm">{checked ? "On" : "Off"}</span>
          </div>
        </VariantSection>

        <VariantSection title="Sizes">
          <Switch size="sm" checked={true} />
          <Switch size="default" checked={true} />
          <Switch size="lg" checked={true} />
        </VariantSection>

        <VariantSection title="States">
          <Switch checked={false} disabled />
          <Switch checked={true} disabled />
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function CheckboxShowcase({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <ShowcaseSection
      title="Checkbox"
      description="Checkbox inputs with neumorphic pressed/raised states."
    >
      <div className="space-y-8">
        <VariantSection title="Default">
          <div className="flex items-center gap-3">
            <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
            <label className="text-sm">Accept terms and conditions</label>
          </div>
        </VariantSection>

        <VariantSection title="States">
          <div className="flex items-center gap-3">
            <Checkbox checked={false} />
            <span className="text-sm">Unchecked</span>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox checked={true} />
            <span className="text-sm">Checked</span>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox checked={false} disabled />
            <span className="text-sm text-muted-foreground">Disabled</span>
          </div>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function ProgressShowcase() {
  const [progress, setProgress] = React.useState(60);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ShowcaseSection
      title="Progress"
      description="Progress bars for loading states and metrics with neumorphic track."
    >
      <div className="space-y-8 max-w-md">
        <VariantSection title="Animated">
          <div className="w-full">
            <Progress value={progress} />
          </div>
        </VariantSection>

        <VariantSection title="Variants">
          <div className="w-full space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Default</label>
              <Progress value={70} indicatorVariant="default" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Success</label>
              <Progress value={100} indicatorVariant="success" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Warning</label>
              <Progress value={50} indicatorVariant="warning" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Destructive</label>
              <Progress value={25} indicatorVariant="destructive" />
            </div>
          </div>
        </VariantSection>

        <VariantSection title="Track Variant">
          <div className="w-full space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Pressed (default)</label>
              <Progress value={60} variant="default" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Flat</label>
              <Progress value={60} variant="flat" />
            </div>
          </div>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function SliderShowcase({
  value,
  onValueChange,
}: {
  value: number;
  onValueChange: (value: number) => void;
}) {
  return (
    <ShowcaseSection
      title="Slider"
      description="Range slider for selecting numeric values with neumorphic track and thumb."
    >
      <div className="space-y-8 max-w-md">
        <VariantSection title="Interactive">
          <div className="w-full space-y-4">
            <Slider value={value} onValueChange={onValueChange} />
            <p className="text-sm text-muted-foreground">Value: {value}</p>
          </div>
        </VariantSection>

        <VariantSection title="Different Values">
          <div className="w-full space-y-4">
            <Slider value={25} />
            <Slider value={50} />
            <Slider value={75} />
            <Slider value={100} />
          </div>
        </VariantSection>

        <VariantSection title="States">
          <div className="w-full">
            <label className="text-sm text-muted-foreground mb-2 block">Disabled</label>
            <Slider value={50} disabled />
          </div>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function SeparatorShowcase() {
  return (
    <ShowcaseSection
      title="Separator"
      description="Visual dividers with subtle neumorphic depth."
    >
      <div className="space-y-8">
        <VariantSection title="Horizontal">
          <div className="w-full space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-4 block">Default</label>
              <Separator variant="default" />
            </div>
            <div className="pt-4">
              <label className="text-sm text-muted-foreground mb-4 block">Flat</label>
              <Separator variant="flat" />
            </div>
          </div>
        </VariantSection>

        <VariantSection title="Vertical">
          <div className="flex h-20 items-center gap-4">
            <span className="text-sm">Item 1</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Item 2</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Item 3</span>
          </div>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function SkeletonShowcase() {
  return (
    <ShowcaseSection
      title="Skeleton"
      description="Loading placeholders with neumorphic styling."
    >
      <div className="space-y-8">
        <VariantSection title="Variants">
          <div className="space-y-4 w-full max-w-md">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Default (Pressed)</label>
              <Skeleton variant="default" className="h-10 w-full" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Flat</label>
              <Skeleton variant="flat" className="h-10 w-full" />
            </div>
          </div>
        </VariantSection>

        <VariantSection title="Card Skeleton">
          <Card variant="flat" className="w-full max-w-md p-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </Card>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function SidebarShowcase() {
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");
  
  return (
    <ShowcaseSection
      title="Sidebar"
      description="Navigation sidebar component for dashboard layouts."
    >
      <div className="space-y-8">
        <VariantSection title="Default Sidebar">
          <div className="flex gap-4 w-full">
            <Sidebar className="relative h-[500px]">
              <SidebarHeader className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <Package className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="font-bold">My App</span>
                </div>
              </SidebarHeader>
              
              <SidebarContent className="p-2">
                <SidebarGroup>
                  <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                  <SidebarItem 
                    active={activeSidebarItem === "dashboard"}
                    onClick={() => setActiveSidebarItem("dashboard")}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </SidebarItem>
                  <SidebarItem 
                    active={activeSidebarItem === "analytics"}
                    onClick={() => setActiveSidebarItem("analytics")}
                  >
                    <BarChart className="h-4 w-4 mr-2" />
                    Analytics
                  </SidebarItem>
                  <SidebarItem 
                    active={activeSidebarItem === "users"}
                    onClick={() => setActiveSidebarItem("users")}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Users
                  </SidebarItem>
                  <SidebarItem 
                    active={activeSidebarItem === "reports"}
                    onClick={() => setActiveSidebarItem("reports")}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Reports
                  </SidebarItem>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Settings</SidebarGroupLabel>
                  <SidebarItem 
                    active={activeSidebarItem === "settings"}
                    onClick={() => setActiveSidebarItem("settings")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </SidebarItem>
                </SidebarGroup>
              </SidebarContent>
              
              <SidebarFooter className="p-2">
                <SidebarItem>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </SidebarItem>
              </SidebarFooter>
            </Sidebar>

            <Card variant="flat" className="flex-1 p-6">
              <p className="text-muted-foreground">
                Selected: <span className="font-medium text-foreground">{activeSidebarItem}</span>
              </p>
            </Card>
          </div>
        </VariantSection>

        <VariantSection title="Collapsed Variant">
          <Sidebar collapsed className="relative h-[300px]">
            <SidebarContent className="p-2">
              <SidebarItem active>
                <Home className="h-5 w-5" />
              </SidebarItem>
              <SidebarItem>
                <BarChart className="h-5 w-5" />
              </SidebarItem>
              <SidebarItem>
                <Users className="h-5 w-5" />
              </SidebarItem>
              <SidebarItem>
                <Settings className="h-5 w-5" />
              </SidebarItem>
            </SidebarContent>
          </Sidebar>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function TypographyShowcase() {
  return (
    <ShowcaseSection
      title="Typography"
      description="Text components for headings, paragraphs, code, and more."
    >
      <div className="space-y-8">
        <VariantSection title="Headings">
          <div className="space-y-4 w-full">
            <Heading as="h1">Heading 1</Heading>
            <Heading as="h2">Heading 2</Heading>
            <Heading as="h3">Heading 3</Heading>
            <Heading as="h4">Heading 4</Heading>
            <Heading as="h5">Heading 5</Heading>
            <Heading as="h6">Heading 6</Heading>
          </div>
        </VariantSection>

        <VariantSection title="Text Variants">
          <div className="space-y-4 w-full">
            <Text>This is regular paragraph text. It uses the default styling for body content.</Text>
            <Text className="font-bold">This is bold text for emphasis.</Text>
            <Text className="italic">This is italic text for subtle emphasis.</Text>
            <Text variant="muted">This is muted text for secondary information.</Text>
            <Text variant="small">This is small text for fine print or captions.</Text>
            <Text variant="large">This is large text for introductions.</Text>
          </div>
        </VariantSection>

        <VariantSection title="Code">
          <div className="space-y-4 w-full">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Inline Code</label>
              <Text>
                Use <Code className="text-sm px-1 py-0.5 rounded">npm install gisketch-neumorphism</Code> to install.
              </Text>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Code Block</label>
              <Code>{`const Button = ({ children }) => {
  return <button>{children}</button>;
};`}</Code>
            </div>
          </div>
        </VariantSection>

        <VariantSection title="Blockquote">
          <Blockquote>
            "Design is not just what it looks like and feels like. Design is how it works."
            <br />
            <Text variant="muted" className="text-sm mt-2">— Steve Jobs</Text>
          </Blockquote>
        </VariantSection>

        <VariantSection title="Lists">
          <div className="grid grid-cols-2 gap-8 w-full">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Unordered List</label>
              <List>
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </List>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Ordered List</label>
              <List variant="ordered">
                <li>First step</li>
                <li>Second step</li>
                <li>Third step</li>
              </List>
            </div>
          </div>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function TableShowcase() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  ];

  return (
    <ShowcaseSection
      title="Table"
      description="Data table components for displaying structured information."
    >
      <div className="space-y-8">
        <VariantSection title="Default Table">
          <div className="w-full">
            <Table>
              <TableCaption>A list of team members</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "Admin" ? "primary" : "outline"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "success" : "destructive"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </VariantSection>

        <VariantSection title="Pressed Variant">
          <div className="w-full">
            <Table variant="pressed">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Widget A</TableCell>
                  <TableCell>$29.99</TableCell>
                  <TableCell>150</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Widget B</TableCell>
                  <TableCell>$49.99</TableCell>
                  <TableCell>75</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function RadioShowcase({ value, onValueChange }: { value: string; onValueChange: (v: string) => void }) {
  return (
    <ShowcaseSection
      title="Radio Group"
      description="Radio button groups for single-selection inputs."
    >
      <div className="space-y-8">
        <VariantSection title="Default">
          <Card variant="flat" className="p-6 w-full max-w-md">
            <RadioGroup value={value} onValueChange={onValueChange}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="option1" id="opt1" />
                <Label htmlFor="opt1">Option One</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="option2" id="opt2" />
                <Label htmlFor="opt2">Option Two</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="option3" id="opt3" />
                <Label htmlFor="opt3">Option Three</Label>
              </div>
            </RadioGroup>
            <p className="text-sm text-muted-foreground mt-4">Selected: {value}</p>
          </Card>
        </VariantSection>

        <VariantSection title="Horizontal Layout">
          <Card variant="flat" className="p-6 w-full">
            <RadioGroup value={value} onValueChange={onValueChange} className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option1" id="h-opt1" />
                <Label htmlFor="h-opt1">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option2" id="h-opt2" />
                <Label htmlFor="h-opt2">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option3" id="h-opt3" />
                <Label htmlFor="h-opt3">Large</Label>
              </div>
            </RadioGroup>
          </Card>
        </VariantSection>

        <VariantSection title="With Cards">
          <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
            {["Free", "Pro", "Enterprise"].map((plan) => (
              <Card
                key={plan}
                variant={value === plan.toLowerCase() ? "pressed" : "flat"}
                className="p-4 cursor-pointer"
                onClick={() => onValueChange(plan.toLowerCase())}
              >
                <div className="flex items-start gap-3">
                  <RadioGroupItem value={plan.toLowerCase()} />
                  <div>
                    <Label className="font-medium">{plan}</Label>
                    <Text variant="muted" className="text-sm">
                      {plan === "Free" && "$0/mo"}
                      {plan === "Pro" && "$19/mo"}
                      {plan === "Enterprise" && "Custom"}
                    </Text>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function SelectShowcase({ value, onValueChange }: { value: string; onValueChange: (v: string) => void }) {
  return (
    <ShowcaseSection
      title="Select"
      description="Dropdown select component for choosing from a list of options."
    >
      <div className="space-y-8">
        <VariantSection title="Default">
          <div className="w-full max-w-xs">
            <Select value={value} onValueChange={onValueChange}>
              <SelectTrigger placeholder="Select a fruit" />
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="grape">Grape</SelectItem>
                <SelectItem value="mango">Mango</SelectItem>
              </SelectContent>
            </Select>
            {value && <p className="text-sm text-muted-foreground mt-2">Selected: {value}</p>}
          </div>
        </VariantSection>

        <VariantSection title="With Label">
          <div className="w-full max-w-xs space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select value={value} onValueChange={onValueChange}>
              <SelectTrigger id="country" placeholder="Select your country" />
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </VariantSection>

        <VariantSection title="Sizes">
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <Select>
              <SelectTrigger className="h-8 text-sm" placeholder="Small" />
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger placeholder="Default" />
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="h-12 text-lg" placeholder="Large" />
              <SelectContent>
                <SelectItem value="1">Option 1</SelectItem>
                <SelectItem value="2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function FormShowcase() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    plan: "",
    terms: false,
    notifications: false,
  });

  return (
    <ShowcaseSection
      title="Form Field"
      description="Form wrapper component with label, description, and error support."
    >
      <div className="space-y-8">
        <VariantSection title="Complete Form Example">
          <Card variant="flat" className="w-full max-w-lg p-6">
            <form className="space-y-6">
              <FormField
                label="Full Name"
                description="Enter your first and last name."
              >
                <Input
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </FormField>

              <FormField
                label="Email"
                description="We'll use this for account notifications."
                error={formData.email && !formData.email.includes("@") ? "Please enter a valid email address" : undefined}
              >
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </FormField>

              <FormField
                label="Bio"
                description="Tell us a bit about yourself."
              >
                <Textarea
                  placeholder="I'm a developer who loves..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </FormField>

              <FormField label="Subscription Plan">
                <Select value={formData.plan} onValueChange={(v) => setFormData({ ...formData, plan: v })}>
                  <SelectTrigger placeholder="Select a plan" />
                  <SelectContent>
                    <SelectItem value="free">Free - $0/mo</SelectItem>
                    <SelectItem value="pro">Pro - $19/mo</SelectItem>
                    <SelectItem value="enterprise">Enterprise - Custom</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="terms"
                    checked={formData.terms}
                    onCheckedChange={(checked) => setFormData({ ...formData, terms: checked as boolean })}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the terms and conditions
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    id="notif"
                    checked={formData.notifications}
                    onCheckedChange={(checked) => setFormData({ ...formData, notifications: checked })}
                  />
                  <Label htmlFor="notif" className="text-sm">
                    Enable email notifications
                  </Label>
                </div>
              </div>

              <Separator />

              <div className="flex gap-3">
                <Button variant="primary" type="submit">
                  Create Account
                </Button>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </VariantSection>

        <VariantSection title="Error States">
          <div className="w-full max-w-md space-y-4">
            <FormField
              label="Username"
              error="This username is already taken"
            >
              <Input placeholder="johndoe" defaultValue="admin" />
            </FormField>

            <FormField
              label="Password"
              error="Password must be at least 8 characters"
            >
              <Input type="password" defaultValue="123" />
            </FormField>
          </div>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}

function FileUploadShowcase() {
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ShowcaseSection
      title="File Upload"
      description="Drag and drop file upload component with neumorphic styling."
    >
      <div className="space-y-8">
        <VariantSection title="Default (Pressed)">
          <div className="w-full max-w-md">
            <FileUpload
              onFilesSelected={handleFilesSelected}
              title="Drop files here or click to upload"
              description="PNG, JPG, PDF up to 10MB"
              multiple
              maxSize={10 * 1024 * 1024}
            />
          </div>
        </VariantSection>

        <VariantSection title="Flat Variant">
          <div className="w-full max-w-md">
            <FileUpload
              variant="flat"
              onFilesSelected={handleFilesSelected}
              title="Upload documents"
              description="Supports PDF, DOC, DOCX"
              accept=".pdf,.doc,.docx"
              icon={<Upload className="w-8 h-8 text-muted-foreground" />}
            />
          </div>
        </VariantSection>

        <VariantSection title="Sizes">
          <div className="w-full space-y-4">
            <FileUpload
              size="sm"
              variant="flat"
              title="Small upload area"
              description="Click or drag"
            />
            <FileUpload
              size="default"
              variant="flat"
              title="Default upload area"
              description="Click or drag files"
            />
            <FileUpload
              size="lg"
              variant="flat"
              title="Large upload area"
              description="Click or drag files here"
            />
          </div>
        </VariantSection>

        {files.length > 0 && (
          <VariantSection title="Uploaded Files">
            <div className="w-full max-w-md space-y-2">
              {files.map((file, index) => (
                <FilePreview
                  key={`${file.name}-${index}`}
                  file={file}
                  onRemove={() => handleRemoveFile(index)}
                />
              ))}
            </div>
          </VariantSection>
        )}

        <VariantSection title="Disabled State">
          <div className="w-full max-w-md">
            <FileUpload
              disabled
              title="Upload disabled"
              description="File upload is currently disabled"
            />
          </div>
        </VariantSection>
      </div>
    </ShowcaseSection>
  );
}
