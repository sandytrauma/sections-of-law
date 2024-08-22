import ActSectionContent from '@/components/ActSectionContent'; // Adjust the path if necessary
import { fetchActSections } from '@/utils/fetchData'; // Adjust the path if necessary
import { ActSections } from '@/constants/types'; // Adjust the path if necessary

const section_ipc: React.FC = async () => {
  // Change the fileName as needed
  const fileName = 'IPC.json';
  const data: ActSections = await fetchActSections(fileName);

  return (
    <div>
      <h1 className="text-center mt-5 text-gray-300 text-2xl md:text-3xl font-mono font-extrabold">Indian Penal Code</h1>
      <ActSectionContent data={data} />
    </div>
  );
};

export default section_ipc;