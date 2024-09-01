import ReactDom from "react-dom/client";
import { Widget } from "./components/Widget";

const normalizeAttribute = (attribute) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

class WidgetWebComponent extends HTMLElement {
  constructor() {
    super();
    // attaching shadow dom to the custom element
    // The { mode: 'open' } option allows external JavaScript to access the shadow DOM using this.shadowRoot.
    this.attachShadow({ mode: "open" });
  }

  // It is called automatically by the browser when the custom element is added to the DOM
  connectedCallback() {
    const props = this.getPropsFromAttributes();
    // It sets up a container where the React component will be rendered.
    // This ensures that React's rendering happens within the isolated shadow DOM, not affecting or being affected by the rest of the page's styles and scripts.
    const root = ReactDom.createRoot(this.shadowRoot);
    root.render(<Widget {...props} />);
  }
 
  getPropsFromAttributes() {
    const props = {};
    for (const { name, value } of this.attributes) {
      props[normalizeAttribute(name)] = value;
    }
    return props;
  }
}

export default WidgetWebComponent;
