export interface Props {
    condition: boolean,
    wrapper: any,
    children: any
}

export const ConditionalWrapper = (props: Props) => props.condition ? props.wrapper(props.children) : props.children