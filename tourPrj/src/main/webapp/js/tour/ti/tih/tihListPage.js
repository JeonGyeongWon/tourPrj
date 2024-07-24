$(document).ready(function() {
            var url = "/api/test.do";
            var chkUrl = "/searchStay1";
            $.ajax({
                url: url,
                type: "post",
                dataType: "json",
                async: false,
                data: {
                    chkUrl: chkUrl,
                },
                success: function(data) {
                    var items = data.response.body.items.item;
                    var ul = $("<ul class='tih_list_ui'></ul>");

                    items.forEach(function(item) {
                        var li = $("<li class='tih_list_li'></li>");

                        var imageDiv = $("<div class='image'></div>");
                        var img = $("<img>")
                            .attr("src", item.firstimage || "/resource/images/sample/no_image.png")
                            .attr("alt", item.title)
                            .on("error", function() {
                                this.onerror = null;
                                this.src = "/resource/images/sample/no_image.png";
                            });

                        imageDiv.append(img);

                        var detailsDiv = $("<div class='details'></div>");
                        var titleDiv = $("<div class='title'></div>").text(item.title);
                        var addrDiv = $("<div class='addr1'></div>").text(item.addr1);
                        var telDiv = $("<div class='tel'></div>").text("전화: " + (item.tel || "정보 없음"));

                        detailsDiv.append(titleDiv).append(addrDiv).append(telDiv);

                        li.append(imageDiv).append(detailsDiv);
                        ul.append(li);
                    });

                    $(".board_list").html(ul);
                },
                error: function(error) {
                    console.log("error: " + error);
                }
            });
        });
