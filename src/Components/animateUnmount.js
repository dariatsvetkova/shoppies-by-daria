import React from "react";

function animateUnmount(WrappedComponent) {

    return class extends React.Component {
        state = {
            shouldRender: this.props.isMounted
        }
    
        componentDidUpdate(prevProps) {

            if (prevProps.isMounted && !this.props.isMounted && this.props.el) {
                setTimeout(() => this.setState({ shouldRender: false }), 300);
                
                // Apply corresponding animation before the component unmounts
                this.props.el.classList.contains("banner") ? 
                    this.props.el.classList.add("unpop") :
                    this.props.el.classList.add("disappear");
                
            } else if (!prevProps.isMounted && this.props.isMounted) {
                this.setState({ shouldRender: true });
            }
        }
    
        render() {
            return (
                this.state.shouldRender ? 
                    <WrappedComponent {...this.props} /> : 
                    null
            )
        }
    }
}

export default animateUnmount;