def destroy
  debugger
  tag = Tag.find_by(name: params[:tagging][:name])
  tagging = Tagging.find_by(
    story_id: params[:tagging][:story_id],
    tag_id: tag.id
  )
  @story = tagging.story

  tagging.destroy

  render "/api/stories/show"
end

def tagging_params
  params.require(:taggin).permit(:story_id, :name)
end
