import { useMemo } from "react"

interface IProps{
  name: string
  size?: string
  color?: string
  profix?: string
}

export default function SvgIcon(props: IProps) {
  const size = props.size ?? "24px"
  const color = props.color ?? ""
  const profix = props.profix ?? "icon"

  const iconName = useMemo<string>(() => {
    return `#${profix}-${props.name}`
  }, [profix, props.name])

  return (
    <svg style={{ height: size, width: size }}>
      <use href={iconName} fill={color} />
    </svg>
  )
}