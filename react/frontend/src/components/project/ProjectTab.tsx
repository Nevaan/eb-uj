import {FC, PropsWithChildren} from "react";

type ProjectTabProps = PropsWithChildren<{
    value: number,
    index: number
}>;

const ProjectTab: FC<ProjectTabProps> = (props) => {
    const { value, index, children } = props;
    return (
        <div role="tabpanel"
            hidden={value !== index}
            id={`project-tab-${index}`}>
            { value === index  && (
                children
            )}
        </div>
    )
}

export default ProjectTab;
