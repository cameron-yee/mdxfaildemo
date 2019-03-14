# Accordion

## Usage

Import accordion into parent component. Inside of parent component store all of your panels (accordion content) in a variable as a data array:

const panels = [
	{
		heading: `First Panel Heading`,
		content: 
    <React.Fragment>
      <p>Example content</p>
    </React.Fragment>
  },
  {
		heading: `Second Panel Heading`,
		content: 
    <React.Fragment>
      <p>Example content</p>
    </React.Fragment>
  },
]

Then pass panels into accordion as a prop:

<Accordion
  panels={panels}
/>
