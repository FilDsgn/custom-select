import "./App.scss";
import Select from "./components/Select/Select";

import block from "bem-cn-lite";
import { ISelectOption } from "./components/Select/Select.types";
const b = block("app");

const App = () => {
  const options: ISelectOption[] = [
    {
      content: "HTML",
      image: "https://timeweb.com/media/bff61f5eb160ec40661943751b6b88dd.png",
    },
    {
      content: "CSS",
      image:
        "https://delta-dev-software.fr/wp-content/uploads/2024/05/CSS-Logo.png",
    },
    {
      content: "JavaScript",
      image:
        "https://media.licdn.com/dms/image/D4E12AQFfe1nZbaWdMw/article-cover_image-shrink_720_1280/0/1698604163003?e=2147483647&v=beta&t=rtD52hfy37nFVmc4_MXfnflV6C-ke773W70SYJLoWRc",
    },
    {
      content: "TypeScript",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
    },
    {
      content: "React",
      image:
        "https://habrastorage.org/getpro/habr/post_images/68b/835/f86/68b835f86d9402568aa41a2946798246.png",
    },
    {
      content: "Vue",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/640px-Vue.js_Logo_2.svg.png",
    },
    {
      content: "Next",
      image:
        "https://www.0xkishan.com/_next/image?url=%2Fblogs%2Fnextjs%2Fhero.png&w=3840&q=75",
    },
  ];

  return (
    <div className={b()}>
      <div className={b("container")}>
        <Select
          multiple={false}
          options={options}
          placeholder="Placeholder"
          title="Select"
          hasCreateOption
        />

        <Select
          multiple={true}
          options={options}
          placeholder="Placeholder"
          title="Multiselect"
          hasSearchIcon
          onUpdate={(options) => console.log(options)}
          dropDownClassName="qwe"
        />

        <Select
          multiple={false}
          options={options}
          placeholder="Placeholder"
          title="Disabled"
          disabled
        />
      </div>
    </div>
  );
};

export default App;
