import z from "zod";
//
// type EmployeeDto = {
// 	firstname: string;
// 	age: number;
// }

// zod
const EmployeeDtoSchema = z.object({
  firstname: z.string(),
  age: z.number().min(18),
  email: z.string().email(),
  password: z.string().min(10).max(50),
});

type EmployeeDto = z.infer<typeof EmployeeDtoSchema>;

function showEmployee(e: EmployeeDto) {}

//
// const e:EmployeeDto = {
// 	firstname: "Klaus",
// 	age: 32
// }

async function loadEmployee() {
  const response = await fetch("...");
  const mayBeEmployee: EmployeeDto = await response.json();

  const result = EmployeeDtoSchema.safeParse("");
  if (result.success) {
    return showEmployee(result.data);
  }

  return result.error.toString();
}
