# Spin Dropdown

Controls dropdown nav arrow spin.  Toggles focus on click. Controls every dropdown arrow on page.  Requires 2 state variables: focus_element and focus_counter.  Tracks the previous focused element because the current focused element will be the element that was just clicked.  Tracks if the previous focused element is the same as the element just clicked. 

USAGE: Wrap a react-bootstrap dropdown component with this component to make the dropdown arrow spin. If this is on a page, every bootstrap dropdown arrow will spin, so there only needs to be one per page.  It can wrap the entire page layout for more clarity.